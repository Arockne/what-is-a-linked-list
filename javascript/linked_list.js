class LinkedList {
  constructor(node = null) {
    this.head = node
  }

  iterate(callback) {
    for (let node = this.head; node; node = node.next) {
      callback(node)
    }
    return this.head
  }

  // print each node's value on its own line
  // use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  print() {
    this.iterate((node) => console.log(node.value))
  }

  // find the node with the target value and return it
  // if not found return null, use your iterate method to be DRY!
  find(target) {
    let found = null;
    this.iterate((node) => {
      if (node.value === target) {
        found = node;
      }
    })
    return found;
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
    node.next = this.head
    this.head = node
  }

  // add node to end of list, no nodes should be removed
  // you may wish to use the iterate method
  addLast(node) {
    if (this.head === null) {
      this.head = node;
    }

    this.iterate((currentNode) => {
      if (currentNode.next === null && currentNode !== node) {
        currentNode.next = node;
      }
    })
  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
    if (this.head === null) {
      return null;
    }

    const newHead = this.head.next;
    const oldHead = this.head
    oldHead.next = null
    this.head = newHead;
    return oldHead;
  }

  // remove the tail node, iterate may be helpful
  // return the node you just removed
  removeLast() {
    let last = null
    this.iterate((currentNode) => {
      if (currentNode.next.next === null) {
        last = currentNode.next;
        currentNode.next = null;
      }
    })
    return last
  }

  // replace the node at the given index with the given node
  replace(idx, node) {
    if (idx === 0) {
      node.next = this.head.next
      this.head = node
    }
    let index = 0;
    this.iterate((currentNode) => {
      if (index+1 === idx) {
        node.next = currentNode.next.next
        currentNode.next = node
      }
      index += 1
    })
    return node;
  }

  // insert the node at the given index
  // no existing nodes should be removed or replaced
  insert(idx, node) {
    if (idx === 0) {
      this.addFirst(node)
      return;
    }
    let index = 0;
    let inserted = false;

    this.iterate((currentNode) => {
      if(index+1 === idx) {
        node.next = currentNode.next
        currentNode.next = node
        inserted = true;
      }
      index += 1
    }) 
    if (!inserted) {
      this.addLast(node)
    }
  }

  // remove the node at the given index, and return it
  remove(idx) {
    if (idx === 0) {
      return this.removeFirst()
    }
    let index = 0;
    let removed = false;

    this.iterate((currentNode) => {
      if (index+1 === idx) {
        removed = currentNode.next
        currentNode.next = currentNode.next.next
      }
      index += 1
    })

    if (!removed) {
      return this.removeLast()
    } else {
      return removed;
    }
  }

  clear() {
    this.head = null;
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value
    this.next = next
  }
}

if (require.main === module) {
  // add your own tests in here
  const node = new Node(1)
  console.log('Test node:', node)

  head = new Node('hi again', new Node('but why?'))
  list = new LinkedList(head)
  // console.log(list.head.value)
  // console.log(list.head.next.value)
  // console.log(list.head.next.next)

  const characters = new LinkedList( new Node('Hamtaro', new Node('Walter White')))
  console.log(characters)
  const drinks = new LinkedList( new Node('Coffee', new Node('Manhattan', new Node('Brandy Sour'))))
  console.log(drinks)
  console.log(drinks.print())
  console.log('Found Node:', drinks.find('Coffee'))
  
  drinks.addFirst(new Node('Coke'))
  drinks.print()

  console.log('\n')

  drinks.addLast(new Node('Lemonade'))
  drinks.print()

  console.log('\n')

  drinks.removeFirst()
  drinks.print()

  console.log('\n')
  
  const last = drinks.removeLast()
  console.log('Last Value:', last)
  drinks.print()

  console.log('\n')

  drinks.insert(0, last)
  drinks.print()

  console.log('\n')

  drinks.insert(5, new Node('Iced Tea'))
  drinks.print()

  console.log('\n')

  drinks.remove(4)
  drinks.print()
}

module.exports = {
  Node, LinkedList
};
