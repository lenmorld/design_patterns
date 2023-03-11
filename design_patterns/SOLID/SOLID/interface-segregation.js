/*
    no interfaces in JS
    it's just duck-typing
    But we can enforce a class not create an object
*/

class LivingThing {
    constructor() {
        console.log(this.constructor.name)
        if (this.constructor.name === 'LivingThing') {
            throw new Error('LivingThing is abstract!')
        }
    }
}

class Human extends LivingThing {
    constructor() {
        super()
    }
}

// 1-
// const h = new Human()
// const lt = new LivingThing() // throws error

//-----
class Machine {
    constructor() {
        console.log(this.constructor.name)
        if (this.constructor.name === 'Machine') {
            throw new Error('Machine is abstract!')
        }
    }

    print(doc) {}
    fax(doc) {}
    scan(doc) {}
}

// if you have a client that wants to make a Multi-function printer
// it works ✅
class MultiFunctionPrinter extends Machine {
    print(doc) {
        // implement
    }
    fax(doc) {
        // implement
    }
    scan(doc) {
        // implement
    }
}


// but if client wants to make an Old fashioned printer
// with no fax and scan
class OldFashionedPrinter extends Machine {
    print(doc) {
        // ok
    }
    fax(doc) {
        // do nothing -> violates "Principle of least surprise"
        // why does the interface have a fax?
    }

    // comment it out? it will just call super()
    // so same problem
    // scan(doc) {
        // do nothing
    // } 

    // throw error
    scan(doc) {
        // throw new Error('not implemented!')

        // improve error-handling
        throw new NotImplementedError('OldFashionedPrinter.scan')
        // NotImplementedError: OldFashionedPrinter.scan is not implemented
    
        // still not user-friendly
        // === interface is too full of stuff clients don't need ===

    }
}


class NotImplementedError extends Error {
    constructor(name) {
        let msg = `${name} is not implemented`
        super(msg)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, NotImplementedError)
        }
    }
}

/*
    Principle of least surprise
    When clients use your API, they shouldn't be surprised with
    lacking or extra behavior
    Everything should be expected
*/


// 2-
// const o = new OldFashionedPrinter()
// o.scan() // Error: not implemented!

/*
    Interface Segregation Principle (ISP)
    - separate / split up interfaces so clients
    dont have to implement more than what they need

    - Machine is too "generic" to be used by MultiFunctionPrinter
*/

class Printer {
    constructor() {
        if (this.constructor.name === 'Printer') {
            throw new Error('Printer is abstract!')
        }
    }

    print() {}
}

class Scanner {
    constructor() {
        if (this.constructor.name === 'Scanner') {
            throw new Error('Scanner is abstract!')
        }
    }

    scan() {}
}

class OldFashionedPrinter2 extends Printer {
    print() {
        console.log("...printing")
    }
}
class OldFashionedScanner2 extends Scanner {
    scan() {
        console.log("...scanning")
    }
}

// 3-
let printer = new OldFashionedPrinter2()
printer.print()

let scanner = new OldFashionedScanner2()
scanner.scan()


// that is good for Single inheritance
// what if you have double inheritance?

// not in JS
// class Photocopier extends Printer, Scanner {}

// solution 1: just provide print() and scan() methods
// but no inheritance
class Photocopier {
    print() {

    }

    scan() {

    }
}


// class Photocopier extends aggregation(Printer, Scanner)
// solution 2: aggregation / mixins
// doesn't make too much sense for Interfaces
// esp. for JS duck-typing


// ISP is somewhat moot in JS
// no strict contract
