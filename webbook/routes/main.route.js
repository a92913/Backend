
const controllerPartner = require('../controllers/partner.controller.js');
const controllerOperational = require('../controllers/operational.controller.js');
const controllerRequest = require('../controllers/request.controller.js');
const controllerOccurrence = require('../controllers/occurrence.controller.js');
const controllerCentralist = require('../controllers/centralist.controller.js');
const controllerManagement = require('../controllers/management.controller.js');
const controllerHelpRequest = require('../controllers/help_request.controller.js');
const controllerLogin = require('../controllers/login.controller.js');
const jsonMessages = __dirname + "/../assets/jsonMessages/";

const app = require('../server');

app.get('/', function(req,res){
    res.send('FIRE!');
});

//partner routes
app.get('/partners/', controllerPartner.readPartner);
app.get('/partners/:id', controllerPartner.readPartnerID);
app.post('/partners/', controllerPartner.savePartner);
app.put('/partners/:id', controllerPartner.updatePartner);
app.delete('/partners/:id', controllerPartner.deletePartner);
app.get('/numberPartner/', controllerPartner.numberPartner);
app.put('/checkOutPartners/:id', controllerPartner.checkOutPartner);
app.get('/numberPerDatePartner/:date', controllerPartner.numberTotalPerDate);

//operational routes
app.get('/operationals/', controllerOperational.readOperational);
app.get('/operationals/:id', controllerOperational.readOperationalID);
app.post('/operationals/', controllerOperational.saveOperational);
app.delete('/operationals/:id', controllerOperational.deleteOperational);
app.put('/operationals/:id', controllerOperational.updateOperational);
app.get('/operationalsPhone/:phone', controllerOperational.readOperationalPhone);
app.get('/operationalsCc/:cc', controllerOperational.readOperationalCc);
app.get('/numberOperationals/', controllerOperational.numberOperationals);

//occurence routes
app.get('/occurrences/:id', controllerOccurrence.readOccurrenceID);
app.get('/occurrences/', controllerOccurrence.readOccurrence);
app.get('/occurrencesStatus/:status', controllerOccurrence.readOccurrenceStatus);
app.get('/numberOccAct/', controllerOccurrence.numberOccAct);
app.get('/numberOccFin/', controllerOccurrence.numberOccFin);
app.get('/numberOccTotal/', controllerOccurrence.numberOccTotal);

//request routes
app.get('/requests/', controllerRequest.readRequest);
app.get('/requests/:id', controllerRequest.readRequestID);
app.post('/requests/', controllerRequest.saveRequest);
app.post('/requeststype/',controllerRequest.saveRequestType);
app.get('/requestss/:typology', controllerRequest.readRequestByTypology);
app.put('/requests/:id', controllerRequest.updateRequest);
app.get('/requestsPending/', controllerRequest.readRequestVerification);
app.delete('/requests/:id', controllerRequest.deleteRequest);
app.get('/requeststype/:id', controllerRequest.readRequestTypeID);
app.get('/requestsTrat/:verification', controllerRequest.readRequestTrat);
app.get('/numberPendingReq/', controllerRequest.numberPendingReq);
app.get('/numberTratReq/', controllerRequest.numberTratReq);
app.get('/numberTotalReq/', controllerRequest.numberTotalReq);
app.get('/numberTotalPerDateReq2019/:content', controllerRequest.numberTotalPerDateReq2019);
app.get('/numberTotalPerDateReq2020/:content', controllerRequest.numberTotalPerDateReq2020);
app.get('/numberTotalPerDateReq2021/:content', controllerRequest.numberTotalPerDateReq2021);

//centralist routes
app.get('/centralists/', controllerCentralist.readCentralist);
app.get('/centralists/:id', controllerCentralist.readCentralistID);
app.post('/centralists/', controllerCentralist.saveCentralist);
app.delete('/centralists/:id', controllerCentralist.deleteCentralist);
app.put('/centralists/:id', controllerCentralist.updateCentralist);
app.get('/centralistsPhone/:phone', controllerCentralist.readCentralistPhone);
app.get('/centralistsCc/:cc', controllerCentralist.readCentralistCc);
app.get('/numberCentralist/', controllerCentralist.numberCentralist);

//rotas da direção
app.get('/managements/', controllerManagement.readManagement);
app.get('/managements/:id', controllerManagement.readManagementID);
app.put('/managements/:id', controllerManagement.updateManagement);
app.post('/managements/', controllerManagement.saveManagement);
app.delete('/managements/:id', controllerManagement.deleteManagement);
app.get('/managementsPhone/:phone', controllerManagement.readManagementPhone);
app.get('/managementsCc/:cc', controllerManagement.readManagementCc);

//rotas pedidos de ajuda
app.get('/helpTotal/', controllerHelpRequest.readHelpRequestTotal);
app.get('/help/', controllerHelpRequest.readHelpRequest);
app.get('/help/:id', controllerHelpRequest.readHelpRequestID);
app.get('/numberHelp/', controllerHelpRequest.numberHelpRequest);

//rotas login
app.get('/loginEmail/:email', controllerLogin.readEmail);
app.get('/login/:id', controllerLogin.readLoginID);
app.put('/login/:id', controllerLogin.updateLogin);
app.put('/updatePassword/:id', controllerLogin.updatePassword);
app.delete('/login/:id', controllerLogin.deleteLogin);

module.exports = app;


//funçao para o login
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    else {
          res.status(jsonMessages.login.unauthorized.status).send(jsonMessages.login.unauthorized);
        return next();
    }
}