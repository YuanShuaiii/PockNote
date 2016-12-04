var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/', function(req, res) {
  return res.render('index', { account:'', err: '' });
});

var url;
var name;
// var des;
// var dig;
// if(url!=='/login') {
    /* 登陆 */
    router.post('/login', function (req, res) {
        var db = req.db;
        name = req.body.name;
        var password = req.body.password;
        var collection = db.get('user');

        collection.find({name: name}, {}, function (e, data) {
            if (data !== '') {
                if (e) {
                    console.log(e);
                } else {
                    data.forEach(function (e) {
                        if (e.password == password) {
                            var des = collection.find({name: name}, {}, function (e, data) {
                                data.forEach(function (e) {
                                })
                            });
                            return res.render('main', {ok: name,
                                des: e.life.des,
                                digest:e.life.digest,

                                des2: e.work.des,
                                digest2:e.work.digest,

                                des3: e.study.des,
                                digest3:e.study.digest,

                                des4: e.todolist.des,
                                digest4:e.todolist.digest
                            });
                        } else if (e.password !== password) {
                            return res.render('index', {account: '', err: 'password wrong'})
                        }
                    })
                }
            }
            if (data == '') {
                return res.render('signup', {exits: 'account do not exits'})
            }
        })
    });
// }


/*  */
router.post('/spage', function (req, res) {
   return res.render('signup', {exits: ''})
});


/* 注册 */
router.post('/signup', function (req, res) {
    var db = req.db;
    name = req.body.name;
    var password = req.body.password;
    var collection = db.get('user');
    collection.find({},{},function (e, data) {
        if(e){
            console.log(e);
        }else{
            data.forEach(function (e) {
                if(e.name!==name){
                    collection.insert({
                        name: name,
                        password: password,
                        
                         life:   {noname:'生活笔记本',des: 'Add Describe...', digest: 'Add Digest...',
                            note:[
                                {title:'',write:''}
                            ]},

                         work:   {noname:'工作笔记本',des: 'Add Describe...', digest: 'Add Digest...',
                                note:[
                                    {title:'',write:''}
                                ]},

                         study:   {noname:'学习笔记本',des: 'Add Describe...', digest: 'Add Digest...',
                                note:[
                                    {title:'',write:''}
                                ]},

                         todolist:   {noname:'todolist',des: 'Add Describe...', digest: 'Add Digest...',
                                note:[
                                    {title:'',write:''}
                                ]}
                    }, function (err) {
                        if(err){
                            console.log(err);
                        }else{
                           return res.render('main',
                               {
                                   digest: 'Add Digest...',
                                   des: 'Add Describe...',

                                   digest2: 'Add Digest...',
                                   des2: 'Add Describe...',

                                   digest3: 'Add Digest...',
                                   des3: 'Add Describe...',

                                   digest4: 'Add Digest...',
                                   des4: 'Add Describe...',

                                   ok: name
                               }
                               )
                        }
                    });
                } else if(e.name == name){
                   return res.render('index', {account: 'Account:' + name + 'is already exit, login directly', err: ''});
                }
            })
        }
    })
});

router.post('/des', function (req, res) {
    var db = req.db;
    var des = req.body.des;
    var collection = db.get('user');

    collection.find({name:name},{}, function (e, data) {
        if(e){
            console.log(e);
        }else{
            data[0].life.des = des;
            collection.update({name: name}, {$set:{life: data[0].life}}, function(){
                res.render('main', {
                    ok:name,

                    des:des,
                    digest:data[0].life.digest,

                    des2:data[0].work.des,
                    digest2:data[0].work.digest,

                    des3:data[0].study.des,
                    digest3:data[0].study.digest,

                    des4:data[0].todolist.des,
                    digest4:data[0].todolist.digest
                })
            });
        }
    });
});
router.post('/digest', function (req, res) {
    var db = req.db;
    var dig = req.body.dig;
    var collection = db.get('user');

    collection.find({name:name},{}, function (e, data) {
        if(e){
            console.log(e);
        }else{
            console.log(data[0]);
            data[0].life.digest = dig;
            collection.update({name: name}, {$set:{life: data[0].life}}, function(){
                res.render('main', {
                    ok:name,

                    digest: dig,
                    des:data[0].life.des,

                    digest2:data[0].work.digest,
                    des2:data[0].work.des,

                    digest3:data[0].study.digest,
                    des3:data[0].study.des,

                    digest4:data[0].todolist.digest,
                    des4:data[0].todolist.des

                })
            });
        }
    });
});



router.post('/des2', function (req, res) {
    var db = req.db;
    var des = req.body.des2;
    var collection = db.get('user');

    collection.find({name:name},{}, function (e, data) {
        if(e){
            console.log(e);
        }else{
            data[0].work.des = des;
            collection.update({name: name}, {$set:{work: data[0].work}}, function(){
                res.render('main', {
                    ok:name,

                    des:data[0].life.des,
                    digest:data[0].life.digest,

                    des2:des,
                    digest2:data[0].work.digest,

                    des3:data[0].study.des,
                    digest3:data[0].study.digest,

                    des4:data[0].todolist.des,
                    digest4:data[0].todolist.digest
                })
            });
        }
    });
});
router.post('/digest2', function (req, res) {
    var db = req.db;
    var dig = req.body.dig2;
    var collection = db.get('user');

    collection.find({name:name},{}, function (e, data) {
        if(e){
            console.log(e);
        }else{
            console.log(data[0]);
            data[0].work.digest = dig;
            collection.update({name: name}, {$set:{work: data[0].work}}, function(){
                res.render('main', {
                    ok:name,

                    digest: data[0].life.digest,
                    des:data[0].life.des,

                    digest2:dig,
                    des2:data[0].work.des,

                    digest3:data[0].study.digest,
                    des3:data[0].study.des,

                    digest4:data[0].todolist.digest,
                    des4:data[0].todolist.des

                })
            });
        }
    });
});



router.post('/des3', function (req, res) {
    var db = req.db;
    var des = req.body.des3;
    var collection = db.get('user');

    collection.find({name:name},{}, function (e, data) {
        if(e){
            console.log(e);
        }else{
            data[0].study.des = des;
            collection.update({name: name}, {$set:{study: data[0].study}}, function(){
                res.render('main', {
                    ok:name,

                    des:data[0].life.des,
                    digest:data[0].life.digest,

                    des2:data[0].work.des,
                    digest2:data[0].work.digest,

                    des3:des,
                    digest3:data[0].study.digest,

                    des4:data[0].todolist.des,
                    digest4:data[0].todolist.digest
                })
            });
        }
    });
});
router.post('/digest3', function (req, res) {
    var db = req.db;
    var dig = req.body.dig3;
    var collection = db.get('user');

    collection.find({name:name},{}, function (e, data) {
        if(e){
            console.log(e);
        }else{
            console.log(data[0]);
            data[0].study.digest = dig;
            collection.update({name: name}, {$set:{study: data[0].study}}, function(){
                res.render('main', {
                    ok:name,

                    digest: data[0].life.digest,
                    des:data[0].life.des,

                    digest2:data[0].work.digest,
                    des2:data[0].work.des,

                    digest3:dig,
                    des3:data[0].study.des,

                    digest4:data[0].todolist.digest,
                    des4:data[0].todolist.des

                })
            });
        }
    });
});




router.post('/des4', function (req, res) {
    var db = req.db;
    var des = req.body.des4;
    var collection = db.get('user');

    collection.find({name:name},{}, function (e, data) {
        if(e){
            console.log(e);
        }else{
            data[0].todolist.des = des;
            collection.update({name: name}, {$set:{todolist: data[0].todolist}}, function(){
                res.render('main', {
                    ok:name,

                    des:data[0].life.des,
                    digest:data[0].life.digest,

                    des2:data[0].work.des,
                    digest2:data[0].work.digest,

                    des3:data[0].study.des,
                    digest3:data[0].study.digest,

                    des4:des,
                    digest4:data[0].todolist.digest
                })
            });
        }
    });
});
router.post('/digest4', function (req, res) {
    var db = req.db;
    var dig = req.body.dig4;
    var collection = db.get('user');

    collection.find({name:name},{}, function (e, data) {
        if(e){
            console.log(e);
        }else{
            console.log(data[0]);
            data[0].todolist.digest = dig;
            collection.update({name: name}, {$set:{todolist: data[0].todolist}}, function(){
                res.render('main', {
                    ok:name,

                    digest: data[0].life.digest,
                    des:data[0].life.des,

                    digest2:data[0].work.digest,
                    des2:data[0].work.des,

                    digest3:data[0].study.digest,
                    des3:data[0].study.des,

                    digest4:dig,
                    des4:data[0].todolist.des

                })
            });
        }
    });
});




//笔记
router.post('/enterlife', function (req, res) {
    var db = req.db;

    var collection = db.get('user');

    collection.find({name:name},{}, function (e, data) {
        // console.log(data[0].life.note);
        var note = data[0].life.note;
        // console.log(note);
        res.render('lifenote',{note:note})
    })
});


//update && delete
router.post('/handle', function (req, res) {
    var db = req.db;
    var title = req.body.title;
    var write = req.body.write;
    console.log(write);
    var collection = db.get('user');
    var save = req.body.Save;
    var delete1 = req.body.Delete;

    console.log(save);
    console.log(delete1);
    if(save == 'Save') {
        collection.find({name: name}, {}, function (e, data) {
            if (e) {
                console.log(e);
            } else {
                var note = data[0].life;
                note.note.forEach(function (data) {
                    if (data.title == title) {
                        data.write = write
                    }
                });
                var newa = data[0].life.note;

                /////////////////////////
                // var note = [{title: "xxxx", write:"yyyyy"}];

                collection.update({name: name}, {$set: {life: note}}, function (e, data) {
                    res.render('lifenote', {note: newa});
                })
            }
        })
    }
    if(delete1 == 'Delete'){
        console.log('ok');
        collection.find({name: name}, {}, function (e, data) {
            if(e){
                console.log(e);
            }else {
                var note = data[0].life;
                var note2 = note.note;
                note.note.forEach(function (e) {
                    if(e.title == title){
                        for(var i = 0; i < note2.length; i++){
                            if(note2[i].title == title){
                                note2.splice(i,1);
                            }
                        }
                    }
                });
                var newa = data[0].life.note;
                collection.update({name: name}, {$set: {life: note}}, function (e, data) {
                    res.render('lifenote', {note: newa})
                })
            }
        })
    }
});


//inseret
router.post('/insert', function (req, res) {
    var db = req.db;
    var insertTitle = req.body.inserttitle;
    var insertWrite = req.body.insertwrite;

    var collection = db.get('user');
    collection.find({name:name},{}, function (e,data) {
        var note = data[0].life;
        // console.log(data[0].life);
        console.log(data[0].life.note);
        data[0].life.note.splice(data[0].life.note.length,0,{title:insertTitle,write:insertWrite});
        var newa = data[0].life.note;



        collection.update({name: name},{$set:{life:note}}, function (e, data) {
            res.render('lifenote',{note:newa});
        })
    })
});



//quit
router.post('/quit', function (req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find({name: name}, {}, function (e, data) {
        data.forEach(function (e) {
            var des = collection.find({name: name}, {}, function (e, data) {
                data.forEach(function (e) {
                })
            });
            return res.render('main', {ok: name,
                des: e.life.des,
                digest:e.life.digest,

                des2: e.work.des,
                digest2:e.work.digest,

                des3: e.study.des,
                digest3:e.study.digest,

                des4: e.todolist.des,
                digest4:e.todolist.digest
            });
        })
    })
});



module.exports = router;

