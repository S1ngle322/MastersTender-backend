import mongooseLoader from "./loaders/mongooseLoader";

mongooseLoader()
    .then(Db => console.log(`${Db}`))
    .catch(err => console.log(err))