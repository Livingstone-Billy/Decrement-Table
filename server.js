const express = require("express");

const bodyParser = require("body-parser");

const JsonTableify = require("jsontableify");
const Jsontableify = require("jsontableify");

const app = express();

const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

app.get('/',(req,res)=>{
    res.set({
        'Access-Control-Allow-Origin':'*'
    });
    return res.redirect('/public/home.html');
}).listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});

app.post("/generate",(req,res)=>{
    res.set({
        'Access-Control-Allow-Origin':'*'
    });

    var Matrix = [
        [req.body.age1,req.body.mode_50,req.body.mode2_50],
        [req.body.age2,req.body.mode_51,req.body.mode2_51],
        [req.body.age3,req.body.mode_52,req.body.mode2_52],
        [req.body.age4,req.body.mode_53,req.body.mode2_53],
        [req.body.age5,req.body.mode_54,req.body.mode2_54],
        [req.body.age6,req.body.mode_55,req.body.mode2_55],   
    ];

    var radix = req.body.radix;

    var mode_Decrement = (exit_mode1,exit_mode2)=>{
        var probability = exit_mode1 * (1 - (0.5 * exit_mode2));
        return probability;
    }
    //age1
    var decrementmode1_age1 = mode_Decrement(Matrix[0][1],Matrix[0][2]);
    var decrementmode2_age1 = mode_Decrement(Matrix[0][2],Matrix[0][1]);
    var exitbymode1_age1 = parseInt(radix * decrementmode1_age1);
    var exitbymode2_age1 = parseInt(radix * decrementmode2_age1);

    //age2
    var radix_age2 = radix - (exitbymode1_age1 + exitbymode2_age1);
    var decrementmode1_age2 = mode_Decrement(Matrix[1][1],Matrix[1][2]);
    var decrementmode2_age2 = mode_Decrement(Matrix[1][2],Matrix[1][1]);
    var exitbymode1_age2 = parseInt(radix_age2 * decrementmode1_age2);
    var exitbymode2_age2 = parseInt(radix_age2 * decrementmode2_age2);

    //age3
    var radix_age3 = radix_age2 - (exitbymode1_age2 + exitbymode2_age2);
    var decrementmode1_age3 = mode_Decrement(Matrix[2][1],Matrix[2][2]);
    var decrementmode2_age3 = mode_Decrement(Matrix[2][2],Matrix[2][1]);
    var exitbymode1_age3 = parseInt(radix_age3 * decrementmode1_age3);
    var exitbymode2_age3 = parseInt(radix_age3 * decrementmode2_age3);

    //age4
    var radix_age4 = radix_age3 - (exitbymode1_age3 + exitbymode2_age3);
    var decrementmode1_age4 = mode_Decrement(Matrix[3][1],Matrix[3][2]);
    var decrementmode2_age4 = mode_Decrement(Matrix[3][2],Matrix[3][1]);
    var exitbymode1_age4 = parseInt(radix_age4 * decrementmode1_age4);
    var exitbymode2_age4 = parseInt(radix_age4 * decrementmode2_age4);

    //age5
    var radix_age5 = radix_age4 - (exitbymode1_age4 + exitbymode2_age4);
    var decrementmode1_age5 = mode_Decrement(Matrix[4][1],Matrix[4][2]);
    var decrementmode2_age5 = mode_Decrement(Matrix[4][2],Matrix[4][1]);
    var exitbymode1_age5 = parseInt(radix_age5 * decrementmode1_age5);
    var exitbymode2_age5 = parseInt(radix_age5 * decrementmode2_age5);

    //age6
    var radix_age6 = radix_age5 - (exitbymode1_age5 + exitbymode2_age5);
    var decrementmode1_age6 = mode_Decrement(Matrix[5][1],Matrix[5][2]);
    var decrementmode2_age6 = mode_Decrement(Matrix[5][2],Matrix[5][1]);
    var exitbymode1_age6 = parseInt(radix_age6 * decrementmode1_age6);
    var exitbymode2_age6 = parseInt(radix_age6 * decrementmode2_age6);

    var MultipleTable = [
        {
            Age:req.body.age1,
            Radix:radix,
            Mode1_rate:Matrix[0][1],
            Mode2_rate:Matrix[0][2],
            DecrementMode1:decrementmode1_age1,
            DecrementMode2:decrementmode2_age1,
            Mode1Exit:exitbymode1_age1,
            Mode2Exit:exitbymode2_age1,
        },
        {
            Age:req.body.age2,
            Remaining:radix_age2,
            Mode1_rate:Matrix[1][1],
            Mode2_rate:Matrix[1][2],
            DecrementMode1:decrementmode1_age2,
            DecrementMode2:decrementmode2_age2,
            Mode1Exit:exitbymode1_age2,
            Mode2Exit:exitbymode2_age2,
        },
        {
            Age:req.body.age3,
            Remaining:radix_age3,
            Mode1_rate:Matrix[2][1],
            Mode2_rate:Matrix[2][2],
            DecrementMode1:decrementmode1_age3,
            DecrementMode2:decrementmode2_age3,
            Mode1Exit:exitbymode1_age3,
            Mode2Exit:exitbymode2_age3,
        },
        {
            Age:req.body.age4,
            Remaining:radix_age4,
            Mode1_rate:Matrix[3][1],
            Mode2_rate:Matrix[3][2],
            DecrementMode1:decrementmode1_age4,
            DecrementMode2:decrementmode2_age4,
            Mode1Exit:exitbymode1_age4,
            Mode2Exit:exitbymode2_age4,
        },
        {
            Age:req.body.age5,
            Remaining:radix_age5,
            Mode1_rate:Matrix[4][1],
            Mode2_rate:Matrix[4][2],
            DecrementMode1:decrementmode1_age5,
            DecrementMode2:decrementmode2_age5,
            Mode1Exit:exitbymode1_age5,
            Mode2Exit:exitbymode2_age5,
        },
        {
            Age:req.body.age6,
            Remaining:radix_age6,
            Mode1_rate:Matrix[5][1],
            Mode2_rate:Matrix[5][2],
            DecrementMode1:decrementmode1_age6,
            DecrementMode2:decrementmode2_age6,
            Mode1Exit:exitbymode1_age6,
            Mode2Exit:exitbymode2_age6,
        },
    ];
    // console.log(JSON.stringify(MultipleTable));

    const {html} = new Jsontableify ({
        headerList: ['Age','Mode1_Rate','Mode2_Rate','DecrementMode1','DecrementMode2','Mode1Exit','Mode1Exit'],
    }).toHtml(MultipleTable);

    res.send(html);
});