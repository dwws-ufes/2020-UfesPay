import {createConnection, Connection} from "typeorm";

const connection = async () : Promise<Connection>  => {
    const connection = await createConnection();
    console.log('Conected to postsql with success!');
    return connection;
}

