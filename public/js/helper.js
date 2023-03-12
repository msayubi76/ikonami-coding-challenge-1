


function ajaxForm(formItems) {
  var form = new FormData();
  formItems.forEach(formItem => {
    form.append(formItem[0], formItem[1]);
  });
  return form;
}



/**
 * 
 * @param {*} url route
 * @param {*} method POST or GET 
 * @param {*} functionsOnSuccess Array of functions that should be called after ajax
 * @param {*} form for POST request
 */
function ajax(url, method, functionsOnSuccess, form) {
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  })

  if (typeof form === 'undefined') {
    form = new FormData;
  }

  if (typeof functionsOnSuccess === 'undefined') {
    functionsOnSuccess = [];
  }

  $.ajax({
    url: url,
    type: method,
    async: true,
    data: form,
    processData: false,
    contentType: false,
    dataType: 'json',
    error: function (xhr, textStatus, error) {
      connectionsInCommonSkeleton.addClass('d-none')
      loadMoreBtnParent.removeClass('d-none')
      console.error('xhr ', xhr);
      console.log(xhr.responseText);
      console.log(xhr.statusText);
      console.log(textStatus);
      console.log(error);
    },
    success: function (response) {

      for (var j = 0; j < functionsOnSuccess.length; j++) {
        for (var i = 0; i < functionsOnSuccess[j][1].length; i++) {
          if (functionsOnSuccess[j][1][i] == "response") {
            functionsOnSuccess[j][1][i] = response;
          }
        }

        functionsOnSuccess[j][0].apply(this, functionsOnSuccess[j][1]);
      }

    }
  });
}


function exampleUseOfAjaxFunction(exampleVariable) {
  // show skeletons
  // hide content

  var form = ajaxForm([
    ['exampleVariable', exampleVariable],
  ]);

  var functionsOnSuccess = [
    [exampleOnSuccessFunction, [exampleVariable, 'response']]
  ];

  // POST 
  ajax('/example_route', 'POST', functionsOnSuccess, form);

  // GET
  ajax('/example_route/' + exampleVariable, 'POST', functionsOnSuccess);
}


function exampleOnSuccessFunction(exampleVariable, response) {
  // hide skeletons
  // show content

  console.log(exampleVariable);
  console.table(response);
  $('#content').html(response['content']);
}

function manageSuggestionOnSuccess(veriables, response) {
  // hide skeletons
  // show content
  connectionsInCommonSkeleton.addClass('d-none')
  loadMoreBtnParent.removeClass('d-none') 

  const suggestions = response.suggestions.data
  const shouldAppendData = veriables.shouldAppend

  nextPageUrl = response.suggestions.next_page_url //assigning value to get more data

  //displaying content on dom
  let html = '';
  suggestions.forEach(suggestion => {
    html += `
            <div class="my-2 shadow  text-white bg-dark p-1" id="suggestion_${suggestion.id}">
              <div class="d-flex justify-content-between">
                <table class="ms-1">
                  <td class="align-middle">${suggestion.name}</td>
                  <td class="align-middle"> - </td>
                  <td class="align-middle">${suggestion.email}</td>
                  <td class="align-middle"> 
                </table>
                <div>
                  <button id="create_request_btn_${suggestion.id}" data-id="${suggestion.id}" onclick="sendRequest(${authUser.id}, ${suggestion.id})" class="btn btn-primary me-1">Connect</button>
                </div>
              </div>
            </div>
            `
  });
 


  loadMoreBtnParent.removeClass('d-none')
  if (nextPageUrl == null) {
    loadMoreBtnParent.addClass('d-none')
  }

  if (shouldAppendData) {
    $('#content').append(html);
  } else {

    $('#content').removeClass('d-none').html(html);
  }
}


function manageSendRequest(veriables, response) {
  // hide skeletons
  // show content
  $(`#suggestion_${veriables.suggestionId}`).remove()
}

function manageDeleteRequest(veriables, response) {
  // hide skeletons
  // show content 
  $(`#request_${veriables.requestId}`).remove()
}



function manageRemoveConnectionRequest(veriables, response) {
  // hide skeletons
  // show content
  $(`#connection_id_${veriables.connectionId}`).remove()
}


manageRemoveConnectionRequest

function manageRequestsOnSuccess(veriables, response) { 
  // hide skeletons
  // show content


  connectionsInCommonSkeleton.addClass('d-none')
  loadMoreBtnParent.removeClass('d-none')


  const requests = response.requests.data
  const shouldAppendData = veriables.shouldAppend
  const mode = veriables.mode

  nextPageUrl = response.requests.next_page_url //assigning value to get more data

  var html = ''

  requests.forEach(request => {
    let modeHtml = `<button id="accept_request_btn_${request.pivot.id}" class="btn btn-primary me-1"
    onclick="acceptRequest(${authUser.id}, ${request.pivot.id})">Accept</button>`

    if (mode == 'sent') {
      modeHtml = `<button id="cancel_request_btn_${request.pivot.id}" class="btn btn-danger me-1"
      onclick="deleteRequest(${authUser.id}, ${request.pivot.id})">Withdraw Request</button>`
    }

    html += `
          <div class="my-2 shadow text-white bg-dark p-1" id="request_${request.pivot.id}">
          <div class="d-flex justify-content-between">
            <table class="ms-1">
              <td class="align-middle">${request.name}</td>
              <td class="align-middle"> - </td>
              <td class="align-middle">${request.email}</td>
              <td class="align-middle">
            </table>
            <div>
              ${modeHtml}
            </div>
          </div>
        </div>
        `
  })

  loadMoreBtnParent.removeClass('d-none')
  if (nextPageUrl == null) {
    loadMoreBtnParent.addClass('d-none')
  }

  if (shouldAppendData) {
    $('#content').append(html);
  } else {

    $('#content').removeClass('d-none').html(html);
  }
}



function manageConnectionsOnSuccess(veriables, response) {
  // hide skeletons
  // show content

  connectionsInCommonSkeleton.addClass('d-none')
  loadMoreBtnParent.removeClass('d-none') 


  const connections = response.connections.data
  const shouldAppendData = veriables.shouldAppend

  nextPageUrl = response.connections.next_page_url //assigning value to get more data

  var html = ''
  let commonConnectinHtml = ''
  connections.forEach(connection => {

    commonConnectinHtml = ''

    if (connection.common_connections_count > 0) {
      commonConnectinHtml = ` <button style="width: 220px" id="get_connections_in_common_" class="btn btn-primary" type="button"
            data-bs-toggle="collapse" data-bs-target="#collapse_" aria-expanded="false" aria-controls="collapseExample">
            Connections in common (${connection.common_connections_count})
          </button>`
    }

    html += `
          <div class="my-2 shadow text-white bg-dark p-1" id="connection_id_${connection.id}">
              <div class="d-flex justify-content-between">
                <table class="ms-1">
                  <td class="align-middle">${connection.name}</td>
                  <td class="align-middle"> - </td>
                  <td class="align-middle">${connection.email}</td>
                  <td class="align-middle">
                </table>
                <div>
                 ${commonConnectinHtml}
                  <button id="create_request_btn_${connection.id}" class="btn btn-danger me-1" 
                    onclick="removeConnection(${authUser.id}, ${connection.id})">Remove Connection</button>
                </div>
              </div>
            </div>
        `
  })


  loadMoreBtnParent.removeClass('d-none')
  if (nextPageUrl == null) {
    loadMoreBtnParent.addClass('d-none')
  }

  if (shouldAppendData) {
    $('#content').append(html);
  } else {

    $('#content').removeClass('d-none').html(html);
  }
}
