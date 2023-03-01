require('dotenv').config();
import sequelize from './src/config/dbConnection';
const PORT = process.env.PORT;
import app from './app';

sequelize.authenticate().then(() => {
    console.log('Connection to database successful!!');
    sequelize.sync();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
}).catch((err: any) => {
    console.error('Error message : ' + err.message);
});

 export default app; 
// module.exports = app; 