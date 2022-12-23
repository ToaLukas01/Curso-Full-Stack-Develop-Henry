// Podes usar esta variable para generar un ID por cada Todo.
let todoId = 1

export const addTodo = (arg)=>  ({
    type: "AddTodo",
    payload: {
        ...arg,
        status: "Todo",
        id: todoId++,
    },
});

export const removeTodo = (arg)=> ({
    type: "RemoveTodo",
    payload: arg,
});

export const toInProgress = (arg)=> ({
    type: "ToInProgress",
    payload: arg,
});

export const toDone = (arg)=> ({
    type: "ToDone",
    payload: arg,
});