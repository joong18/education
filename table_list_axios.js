let companies, persons;
let currentPerson, currentCompany;
let psDelTaget = false, comDelTaget = false, newBt = false;

//const axios = require('axios').default;

// 업체 세부사항 보여주기 위한 이벤트 리스너 등록
function showCompanyDetail(row, company) {
  row.addEventListener('click', (e) => {
    ['name','alias', 'address', 'ceo', 'bsn_rgs_nmb', 'is_doc24', 'business', 'note'].forEach( v => {
      document.getElementById(v).value = company[v];      
    });   
    currentCompany = company;
    comDelTaget = true;
    newBt = false;
    console.log(currentCompany); 
  });
}

// 업체 목록 테이블 초기화
function initCompanyList() {
  const comlistTbody = document.querySelector(".comList tbody");
  companies.forEach( function (company) {
    const row = document.createElement("tr");
    company['note'] = '';
    showCompanyDetail(row, company);
    row.innerHTML = `
      <td><input type="radio" name="companies"></td>
      <td>${company.id}</td>
      <td>${company.name}</td>
      <td>${company.ceo}</td>
      <td>${company.is_doc24}</td>
      <td>${company.business}</td>`;
    comlistTbody.appendChild(row);
  });
}

// 직원 세부사항 보여주기 위한 이벤트 리스너 등록
function showPersonDetail(row, person) {
  row.addEventListener('click', (e) => {
    ['name','position', 'email', 'mobile', 'tel', 'fax', 'part', 'system'].forEach( v => {
      document.getElementById(v).value = person[v];
      console.log(person[v]);
    });    
    const comSelectBox = document.getElementById('com_name');    
    for(let i=0; i<comSelectBox.length; i++) {
      if(comSelectBox[i].value == person.com_id) {
        comSelectBox[i].selected = true;
      }
    }
    currentPerson = person;
    psDelTaget = true;
    newBt = false;
    console.log(currentPerson);
  });
}

// 직원 목록 테이블 초기화
function initPersonList() {
  const pslistTbody = document.querySelector(".psList tbody");
  persons.forEach(function (person) {
    const row = document.createElement("tr");
    showPersonDetail(row, person);
    row.innerHTML = `
        <td><input type="radio" name="persons"></td>
        <td>${person.id}</td>
        <td>${person.name}</td>
        <td>${person.com_name}</td>
        <td>${person.position}</td>
        <td>${person.mobile}</td>
        <td>${person.email}</td>
        <td>${person.system}</td>`;
    pslistTbody.appendChild(row);
  });
}
 
// 직원의 회사명 가져오기
function getCompanyName(person) {
  const matchedComp = companies.filter( company => company.id === person.com_id );
  return matchedComp.length === 1 ? matchedComp[0].name : '알수없음';
}
// // 직원의 회사ID 가져오기
// function getCompanyId(com_name) {
//   const matchedComp = companies.filter( company => company.name === com_name );
//   return matchedComp.length === 1 ? matchedComp[0].id : '알수없음';
// }


// 직원 세부보기의 회사 선택 박스 초기화
function initCompanySelectBox() {
  const comSelectBox = document.getElementById('com_name');
  comSelectBox.options.length = 1;
   companies.forEach( (company) => {
    let option = document.createElement('option');
    option.value = company.id;
    option.innerHTML = company.name;
    comSelectBox.appendChild(option);
  }) 
  
}

// 회사 목록 및 직원 목록 가져오기, (회사, 직원) 페이지에 따라 초기화  시작
// function fetchCompaniesAndPersons() {
//   Promise.all([fetch("http://mrtg1.busanedu.net/namecard/companies").then(response => response.json()),
//   fetch("http://mrtg1.busanedu.net/namecard/persons").then(response => response.json())]) //
//     .then(results => {
//       [companies, persons] = results;
//       persons.forEach(person => person['com_name'] = getCompanyName(person));
//       if (document.querySelector(".psList tbody") !== null) {
//         initPersonList();
//         initCompanySelectBox();        
//       } else if (document.querySelector(".comList tbody") !== null) {      
//         initCompanyList();
//       } else {
//         return
//       }      
//     })    
//     .catch(error => {
//       console.log(error);
//     })  

// }
//const axios = require('axios');

function fetchCompaniesAndPersons() {

  axios.get('http://mrtg1.busanedu.net/namecard/companies')
    .then(function(response){
      companies = response.data;
      console.log(response);
      console.log(companies);
      companyOrPerson();
    })
    .catch(error => {
      console.log(error);
    }) 

  axios.get('http://mrtg1.busanedu.net/namecard/persons')
    .then(function(response){
      persons = response.data;
      console.log(response);
      console.log(persons);
      persons.forEach(person => person['com_name'] = getCompanyName(person));
      companyOrPerson();            
    })    
    .catch(error => {
      console.log(error);
    })  
    
}

function companyOrPerson(){
  if (document.querySelector(".psList tbody") !== null) {
    initPersonList();
    initCompanySelectBox();        
  } else if (document.querySelector(".comList tbody") !== null) {      
    initCompanyList();
  } else {
    return
  }
}

window.onload = function() {
  fetchCompaniesAndPersons();
}

//입력창 클리어
function clearInputTxt(){
  const inputElList = document.querySelectorAll('.inputTxt');
  console.log(inputElList);
  for (let i=0; i<inputElList.length; i++){        
    inputElList[i].value = null;
  }      
  if(psDelTaget === true){
    initCompanySelectBox();
    psDelTaget = false;
  } else if(comDelTaget === true){
    comDelTaget = false;
  } else {
    console.log(psDelTaget);
    console.log(comDelTaget);
  }  
}

//신규 버튼 클릭 시 
function newBtHandler(){
  newBt = true;
  clearInputTxt();
}
document.querySelector("#newBt").addEventListener("click", newBtHandler);

//삭제버튼 클릭 시 삭제
function deleteBtHandler(){
  if (psDelTaget === true){    
    persons = persons.filter(function(p) {         
      return p.id !== currentPerson.id;
    } );      
    document.querySelector(".psList tbody").innerHTML ='';
    initPersonList();
    clearInputTxt();
  } else if (comDelTaget === true) { 
    companies = companies.filter(function(c) {
      return c.id !== currentCompany.id;
    } );      
    document.querySelector(".comList tbody").innerHTML ='';    
    initCompanyList();
    clearInputTxt();
  } else {
    alert('삭제 대상이 없습니다.');
  } 
}
document.querySelector("#deleteBt").addEventListener('click', deleteBtHandler);

// 저장버튼 클릭 시 저장
function saveBtHandler(){
  if (document.querySelector(".psList tbody") !== null) {
    let person = {};
    ['name','position', 'email', 'mobile', 'tel', 'fax', 'part', 'system'].forEach( v => {
      person[v] = document.getElementById(v).value;
    });
    if(newBt === true){
      person.id = persons[persons.length-1].id + 1;
      console.log(person.id)
      let selectedCom = document.getElementById('com_name');
      console.log(selectedCom);
      person.com_id = selectedCom.options[selectedCom.selectedIndex].value;
      person.com_name= selectedCom.options[selectedCom.selectedIndex].text;
      persons.push(person);
      console.log(person);
      document.querySelector(".psList tbody").innerHTML ='';
      initPersonList();
    } else {
      person.id = currentPerson.id;
      let index = persons.indexOf(currentPerson);
      person.com_name= selectedCom.options[selectedCom.selectedIndex].text;
      persons[index] = person;
      document.querySelector(".psList tbody").innerHTML ='';
      initPersonList();
    }
  } else if (document.querySelector(".comList tbody") !== null) {   
    let company = {};  
    ['name','alias', 'address', 'ceo', 'bsn_rgs_nmb', 'is_doc24', 'business', 'note'].forEach( v => {
      company[v] = document.getElementById(v).value;   
      console.log(company[v]);       
    });      
    if(newBt === true){      
      company.id = companies[companies.length-1].id + 1;      
      companies.push(company);
      document.querySelector(".comList tbody").innerHTML ='';
      initCompanyList();
    } else {
      company.id = currentCompany.id;
      let index = companies.indexOf(currentCompany);
      companies[index] = company;
      document.querySelector(".comList tbody").innerHTML ='';
      initCompanyList();
    }      
  }
}
document.querySelector("#saveBt").addEventListener('click', saveBtHandler);

function showPersonDetail(row, person) {
  row.addEventListener('click', (e) => {
    ['name','position', 'email', 'mobile', 'tel', 'fax', 'part', 'system'].forEach( v => {
      document.getElementById(v).value = person[v];
      console.log(person[v]);
    });    
    const comSelectBox = document.getElementById('com_name');    
    for(let i=0; i<comSelectBox.length; i++) {
      if(comSelectBox[i].value == person.com_id) {
        comSelectBox[i].selected = true;
      }
    }
    currentPerson = person;
    psDelTaget = true;
    newBt = false;
    console.log(currentPerson);
  });
}






