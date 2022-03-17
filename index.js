const http=require('http');
const fs=require('fs');
const requests=require('requests');
const mainHtml=fs.readFileSync('./home.html','utf-8');
const replaceVal=(tempData,currentData)=>{
tempData=tempData.replace("{%tempval%}",`${Math.round(currentData.main.temp-273.15)}°C`);
tempData=tempData.replace("{%tempMin%}",`${Math.round(currentData.main.temp_min-273.15)}°C`);
tempData=tempData.replace("{%tempMax%}",`${Math.round(currentData.main.temp_max-273.15)}°C`);
tempData=tempData.replace("{%location%}",currentData.name);
tempData=tempData.replace("{%country%}",currentData.sys.country);
//{%currentWeather%}
tempData=tempData.replace("{%currentWeather%}",currentData.weather[0].main);
    return tempData;
};
const server=http.createServer((req,res)=>{
    if(req.url=='/'){
        //fetching data from api
        requests('http://api.openweathermap.org/data/2.5/weather?q=chakradharpur&appid=eb00aa0c1a8e0376d2c90d049a9b4aa0')
        .on('data', (chunk)=> {
            //data has come in json form 
            const objectData=JSON.parse(chunk);
            const arrData=[objectData];//object inside a array
            const realTimeData=arrData.map((val)=>replaceVal(mainHtml,val));
            res.write(realTimeData.toString());
        })
          .on('end', (err)=> {
             res.end();
          })
    }
}).listen(8000,'127.0.0.1',function(){
    console.log('server listeaning to port 8000');
});
module.exports=index.js;

