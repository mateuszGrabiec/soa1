const soapRequest = require('easy-soap-request');
const readline = require("readline");


// example data
const url = 'http://127.0.01:8088/mockApiPortSoap11';
const sampleHeaders = {
    'user-agent': 'sampleTest',
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
};
const xml1 = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lab1="http://amw.gdynia.pl/sao/lab1"> <soapenv:Header/> <soapenv:Body> <lab1:registerCallRequest> <lab1:student>?</lab1:student> </lab1:registerCallRequest> </soapenv:Body> </soapenv:Envelope>`;

const xml2=`<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:lab1="http://amw.gdynia.pl/sao/lab1"> <soapenv:Header/> <soapenv:Body> <lab1:resultsRequest> <lab1:student>?</lab1:student> </lab1:resultsRequest> </soapenv:Body> </soapenv:Envelope>`;

// usage of module
function sendRequest(xml) {
    (async () => {
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
        const { headers, body, statusCode } = response;
        console.log(headers);
        console.log(body);
        console.log(statusCode);
        rl.prompt()
    })();
    
}
//sendRequest(xml1);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


rl.setPrompt("Which request do u want?\n1.call\n2.result\n3.exit\n")
rl.prompt()
rl.on("line", function(input){1
    switch (input) {
        case '1':
            sendRequest(xml1);

            break
        case '2':
            sendRequest(xml2);
            break
        case '3':
            rl.close()
        default:
            console.log("input 1, 2 or 3");
            break
    }   
}).on("close", function () {
    console.log("\nBYE BYE !!!");
    process.exit(0);
});