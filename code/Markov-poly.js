autowatch = 1;
outlets = 6;


var myval = [];
var markObj = {};
var currentGram = [];
var nseq= null;
var seqtowrite;
function list() {
    var a = arrayfromargs(arguments);
    myval.push(a);
}


function clear() {
    markObj = {};
    myval = [];
    result = [];
    pitches = [];
    pitches2= [];
    velocities = [];
    velocities2 = [];
    durations = [];
    newnotelist = [];

}

function setnseq(x){
    nseq= x

}


function callCreate(seqnumber, nstep) {

    createMarkov(myval, seqnumber, nstep);

}



function createMarkov(noteList, seqnumber, nstep) {


    post("notelist : " + noteList.toString());
    post();
    post("seqnumber: " + seqnumber);
    post();
    post("nstep " + nstep);
    post();


    for (var j = 0; j < noteList.length; j++) {
        //fold the total index by the number of sequences



        if (typeof (newnotelist[j % nstep]) === 'undefined') {


            newnotelist[j % nstep] = (noteList[j].slice(1, noteList[j].length));
            post("newnotelist[j % nstep]" + newnotelist[j % nstep]);
            post();
        }
        else {

            newnotelist[j % nstep]=  noteList[j].slice(1, noteList[j].length).concat(newnotelist[j % nstep]);
            post("newnotelist[j % nstep] unshift" + newnotelist[j % nstep] );
            post();
        }
    }



    post("new note list : " +  newnotelist.toString());
    post();
    for (var key in newnotelist) {
        if (newnotelist.hasOwnProperty(key)) {
            post("key nnl: " + key + " " + "value: " + newnotelist[key][4]+ " ");
            post();
        }
    }
    for (var i = 0; i < newnotelist.length; i++) {


        if (!markObj[newnotelist[i].toString()]) {
            markObj[newnotelist[i].toString()] = [];

        }
        //push first element after last to create a loop
        if (i === newnotelist.length - 1) {

            markObj[newnotelist[i].toString()].push(newnotelist[0]);
        } else {
            markObj[newnotelist[i].toString()].push(newnotelist[i + 1]);

        }

    }

}

var result = [];
var pitches = [];
var pitches2= [];
var velocities = [];
var velocities2= [];
var durations = [];
var newnotelist = [];

function generate() {



    currentGram = newnotelist[0];
    post("currentGram: " + currentGram);
    post();
    result.push(currentGram);


    for (var i = 0; i < 64; i++) {
        //currentGram.toString().replace(/[ ,]+/g, ",");
        //get all possible succesors given an index
        var possibilities = markObj[currentGram];
        //pick a value from all possible values and add it to the result string
        var next = possibilities[Math.floor(Math.random() * possibilities.length)];


        result.push(next);
        currentGram = result[result.length - 1];
        /*post("result: " + result[i][0]);
        post();*/
        pitches.push( result[i][0]);
        velocities.push(result[i][1]);
        //durations.push(result[i][2]);
        pitches2.push( result[i][3]);
        velocities2.push( result[i][4]);

    }







    outlet(0, pitches);
    outlet(1, velocities);
    outlet(2, durations);
    outlet(3, pitches2);
    outlet(4, velocities2);



}











