import * as mysql from "mysql"

// export const db = async() => {
//     try {
        
//         return db
//     } catch (error) {
//         console.log('Something went wrong. Could not connect to database.')
//     }
// }

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ctti_database',
})

db.connect(err => {
    if(err) console.log('Could not connect to database')
    else console.log('Connection successful...')
})

db.query(`SELECT * FROM course`, [], (err, data) => {
    if(err) console.log('Something went wrong. Unable to fetch courses')
    else console.log({data})
})

export default db