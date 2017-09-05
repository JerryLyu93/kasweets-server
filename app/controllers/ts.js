"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Student {
    constructor(firstName, middleName, lastName) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.fullName = firstName + ' ' + middleName + ' ' + lastName;
    }
}
var Sex;
(function (Sex) {
    Sex[Sex["male"] = 0] = "male";
    Sex[Sex["female"] = 1] = "female";
})(Sex || (Sex = {}));
let fuck = 'wow';
let user = {
    firstName: 'Jane',
    middleName: 'M.',
    lastName: 'User',
    isStudent: true,
    sex: Sex[0],
    age: 15,
    friend: ['Tom', 'Jerry']
};
let numArray = ['Alice', 'Bob'];
let greeter;
greeter = function (person) {
    return "Hello, " + JSON.stringify(person);
};
function identity(arg) {
    return arg;
}
function ts(req, res) {
    res.send(identity([greeter(user)]));
}
exports.ts = ts;
