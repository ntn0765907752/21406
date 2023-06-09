var currentPage = 1
function loadPage(page){
    currentPage = page
    $.ajax({
        url: '/accounts?page=' + page,
        type: 'GET'
    })
    .then(data => {
        console.log(data['data']);
        $('#content').html('')
        for (let i = 0; i < data['data'].length; i++) {
            const element = data['data'][i];
            const item = $(`
            <h1>${element.username} : ${element.password}</h1>
            `)
            $('#content').append(item)
        }
    })
    .catch(err => {
        console.log('errrrr')
    })
}

function nextPage() { 
    currentPage ++
    $.ajax({
        url: '/accounts?page=' + currentPage,
        type: 'GET'
    })
    .then(data => {
        console.log(data);
        $('#content').html('')
        for (let i = 0; i < data['data'].length; i++) {
            const element = data['data'][i];
            const item = $(`
            <h1>${element.username} : ${element.password}</h1>
            `)
            $('#content').append(item)
        }
    })
    .catch(err => {
        console.log('errrrr')
    })

 }


 function previousPage() { 
    currentPage --
    $.ajax({
        url: '/accounts?page=' + currentPage,
        type: 'GET'
    })
    .then(data => {
        console.log(data);
        $('#content').html('')
        for (let i = 0; i < data['data'].length; i++) {
            const element = data['data'][i];
            const item = $(`
            <h1>${element.username} : ${element.password}</h1>
            `)
            $('#content').append(item)
        }
    })
    .catch(err => {
        console.log('errrrr')
    })

 }