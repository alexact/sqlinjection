const { Client } = require('pg')
const express = require ("express")
const app = express();
app.use(express.json())
const client = new Client({
    user:"postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "seguridad"
    
})
/*client.connect()
.then(()=> client.query("SELECT * FROM empleados where name=$1",["Alvaro"]))
.then(results => console.table(results.rows))
.then(()=> console.log("Connected successfuly"))
.catch(e => console.log(e))
.finally(() => client.end())*/
app.listen(8081, () => console.log("Web server is listening.. on port 8080"))

start()

async function start() {
    await connect();
    /*
    const todos = await readTodos();
    console.log(todos)
    const successCreate = await createTodo("Go to trader joes")
    console.log(`Creating was ${successCreate}`)
    const successDelete = await deleteTodo(1)
    console.log(`Deleting was ${successDelete}`)
    */
}
async function connect() {
    try {
        await client.connect();
    }
    catch(e) {
        console.error(`Failed to connect ${e}`)
    }
}
app.delete("/empleados", async (req, res) => {
    let result = {}
    try{

        const reqJson = req.body;
        await deleteEmpleado(reqJson.id)
        result.success= true;
    }
    catch(e){
        result.success=false;
    }
    finally{
        res.setHeader("content-type", "application/json")
        res.send(JSON.stringify(result))
    }
   
})
async function deleteEmpleado(id){

    try {
        await client.query("delete from empleados where id = $1", [id]);
        return true
        }
        catch(e){
            return false;
        }
}