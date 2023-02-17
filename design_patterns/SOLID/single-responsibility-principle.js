const fs = require('fs')

class Journal {
    static count = 0;

    constructor() {
        this.entries = {}
    }

    addEntry(text) {
        const count = ++Journal.count;
        this.entries[count] = `${count} : ${text}`
    }

    toString() {
        return Object.values(this.entries).join("\n")
    }

    // ======
    // ANTI-PATTERN: 2nd responsibility
    // problem: when adding serialization logic (reading and writing)
    // e.g. remove indices before serializing, processing when loading
    // If you have other objects in your system that can be serialized, write/read to files
    // or persistence, then they can't use this
    
    // FIX: put them in a separate class for serialization/persistence
    // save(filename) {
    //     fs.writeFileSync(filename, this.toString())
    // }

    // load(filename) {...}
    // loadFromUrl() {...}
    // =====

}
// static can also be declared like:
// Journal.static = 0 

// FIX: this can be used for any object, not just Journal!
class PersistenceManager {
    save(filename, data) {
        fs.writeFileSync(filename, data)
    }
    // load(filename) {...}
    // loadFromUrl() {...}
}

// usage
const j = new Journal()

j.addEntry("hello")
j.addEntry("hello again")
console.log(j.toString())
// j.save("journal.txt") // moved to persistenceManager

// FIX part 2
const p = new PersistenceManager()
p.save("journal.txt", j.toString())

/* output: (doesn't change after fix)
1 : hello
2 : hello again
*/


/*
ANTI-PATTERN: a "God" object
one huge massive class with lots of responsibilities, spaghetti code
difficult to figure out

Single responsibility principle: 
Just 1 responsibility per SE (software entity: class/module/function)
If you need other responsibilities, create new ones. It's cheap and more maintainable

Separation of concerns:
When refactoring a really complicated algorithm
into several different unit/encapsulated parts somehow related
Different concerns - separate into its own SE 
*/