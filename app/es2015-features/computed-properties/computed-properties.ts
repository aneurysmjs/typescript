/**
 Computed Properties

 It allows you to define a property on an object with a name that's
 computed dynamically at runtime.

 // we can't use string concatenation to add the prefix 'os_' at the
 // the beginning of every property, but we can if we use computed properties
 var support = {
     "os_Windows": isSupported('Windows'),
     "os_iOS": isSupported('iOS'),
     "os_Andriod": isSupported('Android')
 };
*/

/**
 the first thing we need to do convert the property name into computed properties
 is first wrapping then in brackets, then we can turn then into expressions, like
 adding the value of the `osPrefix` variable to then.
 */

const osPrefix = 'os_';

var support = {
    [osPrefix + "Windows"]: isSupported('Windows'),
    [osPrefix + "iOS"]: isSupported('iOS'),
    [osPrefix + "Andriod"]: isSupported('Android')
};

function isSupported(os) {
    return Math.random() >= 0.5;
}