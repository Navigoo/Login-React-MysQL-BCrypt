const bcrypt = require('bcrypt');
class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);


    }

    login(app, db) {

            app.post('/login', (req, res) => {
                    let username = req.body.username;
                    let password = req.body.password;

                    username = username.toLowerCase();

                    if (username.lenght > 12 || password.length > 12) {
                        res.json({
                            success: false,
                            msg: 'An eccor occured pls try again'
                        })
                        return;
                    
                    
                }
                             //If one user find
                             if (data && data.lenght === 1) {
                                bcrypt.compare(password, data[0].password, (bcrypterr, verified) => {
            
                                    if (verified) {
                                        req.session.userID = data[0].id;
                                        req.json({
                                            success: true,
                                            username: data[0].username
                                        })
                                        return;
                                    } else {
                                        res.json({
                                            success: false,
                                            msg: 'Wrong password'
                                        })
                                    }
            
                                });
            
                            } else {
                                res.json({
                                    success: false,
                                    msg: 'user not found try again'
                                })
                            }
            
                        });

                    }

                    logout(app, db) {
                            app.post('/logout', (req,res)=> {
                                if (req.session.userID) {
                                    req.session.destroy();
                                    req.json({
                                        success: true
                                    })
                                    return true;
                                }else{
                                    res.json({
                                        success: false
                                    })
                                    return false;
                                }
                            })
        
                    }
        
                    isLoggedIn(app, db) {
                        app.post('/isLoggedIn', (req,res)=>{
                            if (req.session.userID) {
                                let cols = [req.session.userID];
                                db.query('SELECT * FROM user WHERE id = ? LIMIT 1', (err, data, fields)=>{
                                    if (data && data.lenght === 1) {
                                        res.json({
                                            success: true,
                                            username: data[0].username
                                        })
                                        return true;
                                    }else {
                                        res.json({
                                            success: false
                                        })
                                    }
                                });
                            }
                            else{
                                res.json({
                                    success: false
                                })
                            }
                        })
        
                    }
   }        
                

            

        
    

            module.exports = Router;