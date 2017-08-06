const designPatternsList = [{
  name: '单例模式',
  key: 'singleton',
  link: './singleton'
}, {
  name: '桥接模式',
  key: 'bridge',
  link: './bridge'
}]

class Pattern {
  constructor (name) {
    this.name = name    
  }

  getName () {
    return this.name
  }
}

const designPatterns = {
  list () {
    return `
      <h1>Design Patterns</h1>
      <ul>
        ${designPatternsList.reduce((a, b) => a + `<li><a href="${b.link}">${b.key}</a></li>`, '')}
      </ul>
    `
  },
  singleton () {
    let singleton
    
    class Singleton extends Pattern{
      constructor(name) {
        super(name)
      }
    }

    singleton = new Singleton('hello')
    return `
      first singleton: ${singleton.getName()}<br/>
      second singleton: ${singleton ? 'couldn\'t new more singleton' : new Singleton('world').getName()}
    `
  },
  bridge () {
    class Bridge extends Pattern{
      constructor(name) {
        super(name)
      }
    }

    return new Bridge('bridge').getName()
  }
}

module.exports = function (req, res) {
  const paramName = req.params.name
  res.set('Content-Type', 'text/html')
  res.send(designPatterns[paramName]())
}
