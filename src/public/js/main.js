var currentPage = 1
function loadPage(page){
    currentPage = page
    $.ajax({
        url: '/accounts?page=' + page,
        type: 'GET'
    })
    .then(data => {
        console.log(data)
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
        console.log('err4r')
    })
}

// function nextPage() { 
//     currentPage ++
//     $.ajax({
//         url: '/accounts?page=' + currentPage,
//         type: 'GET'
//     })
//     .then(data => {
//         console.log(data);
//         $('#content').html('')
//         for (let i = 0; i < data['data'].length; i++) {
//             const element = data['data'][i];
//             const item = $(`
//             <h1>${element.username} : ${element.password}</h1>
//             `)
//             $('#content').append(item)
//         }
//     })
//     .catch(err => {
//         console.log('errrrr')
//     })

//  }


//  function previousPage() { 
//     currentPage --
//     $.ajax({
//         url: '/accounts?page=' + currentPage,
//         type: 'GET'
//     })
//     .then(data => {
//         console.log(data);
//         $('#content').html('')
//         for (let i = 0; i < data['data'].length; i++) {
//             const element = data['data'][i];
//             const item = $(`
//             <h1>${element.username} : ${element.password}</h1>
//             `)
//             $('#content').append(item)
//         }
//     })
//     .catch(err => {
//         console.log('er4r')
//     })

//  }

 $('#paging').pagination({
    dataSource: '/accounts?page=1',
    locator: 'data',
    totalNumberLocator: function(response) {
        // you can return totalNumber by analyzing response content
        return response.total;
    },
    pageSize : 6,
    showSizeChanger: true,
    afterPageOnClick: function(event, pageNumber){
        loadPage(pageNumber)
    },
    afterPreviousOnClick: function(event, previousPageNumber){
        loadPage(previousPageNumber)

    },
    afterNextOnClick: function(event, nextPageNumber){
        loadPage(nextPageNumber)
        
    }
  
})
loadPage(1)