
var fs=require('fs');
var r=require('readline');

var rd=r.createInterface(
  {
  input: fs.createReadStream("csv/crimes2001onwards.csv"),
});

var heading=[];
var count=0;
var obj={},obj2={};
var l=[],l2=[];


//var json={"OVER $500":[],"$500 AND UNDER":[]}


rd.on('line', function(line)
{
  var value=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  if (count == 0)
  {
    heading =value;
    count=count+1;
  }
  else
  {
    if(value[5] =="ASSAULT" && value [8]=="true" && !obj[value[17]])
    {
      obj[value[17]]=1;
    }
    else if(value[5] =="ASSAULT" && value [8]=="true")
    {
      obj[value[17]]=obj[value[17]]+1;
    }
    else if(value[5] =="ASSAULT"  && value [8]=="false" &&!obj2[value[17]])
    {
        obj2[value[17]]=1;
    }
    else if(value[5] =="ASSAULT"  && value [8]=="false")
    {
      obj2[value[17]] =obj2[value[17]]+1;
    }


  }
//    console.log(json);


});

rd.on('close',function()
{
  for (var k in obj)
  {
    var json={"year":[],"value":[]}
    json["year"]=k;
    json["value"]=obj[k];
    l.push(json);
  }
  for (var k in obj2)
  {
    var json={"year":[],"value":[]}
    json["year"]=k;
    json["value"]=obj2[k];
    l2.push(json);
  }

console.log(l);
  fs.writeFileSync('line1.json',JSON.stringify(l),'utf8',function(err){console.log(err);});
  fs.writeFileSync('line2.json',JSON.stringify(l2),'utf8',function(err){console.log(err);});
  //console.log(obj);
  console.log("done");
});
