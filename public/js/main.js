var skeletonId = 'skeleton';
var contentId = 'content';
var skipCounter = 0;
var takeAmount = 10;
var nextPageUrl = null
const connectionsInCommonSkeleton = $('#connections_in_common_skeleton')
const loadMoreBtnParent = $('#load_more_btn_parent')

function getRequests(mode) {
  // your code here...

  var functionsOnSuccess = [
    [manageRequestsOnSuccess, [{ mode: mode, shouldAppend: false }, 'response']]
  ];
  connectionsInCommonSkeleton.removeClass('d-none')
  loadMoreBtnParent.addClass('d-none')
  ajax(`/requests/${mode}`, 'GET', functionsOnSuccess);
}

function getMoreRequests(mode) {
  // Optional: Depends on how you handle the "Load more"-Functionality
  // your code here...

  var functionsOnSuccess = [
    [manageRequestsOnSuccess, [{ mode: mode, shouldAppend: true }, 'response']]
  ];
  connectionsInCommonSkeleton.removeClass('d-none')
  loadMoreBtnParent.addClass('d-none')
  ajax(nextPageUrl, 'GET', functionsOnSuccess, undefined);
}

function getConnections() {
  // your code here...
  var functionsOnSuccess = [
    [manageConnectionsOnSuccess, [{ shouldAppend: false }, 'response']]
  ];
  ajax('/connections', 'GET', functionsOnSuccess);
}

function getMoreConnections() {
  // Optional: Depends on how you handle the "Load more"-Functionality
  // your code here...
  var functionsOnSuccess = [
    [manageConnectionsOnSuccess, [{ shouldAppend: true }, 'response']]
  ];
  connectionsInCommonSkeleton.removeClass('d-none')
  loadMoreBtnParent.addClass('d-none')
  ajax(nextPageUrl, 'GET', functionsOnSuccess);

}

function getConnectionsInCommon(userId, connectionId) {
  // your code here...
}

function getMoreConnectionsInCommon(userId, connectionId) {
  // Optional: Depends on how you handle the "Load more"-Functionality
  // your code here...
}

function getSuggestions() {
  // your code here...
  var functionsOnSuccess = [
    [manageSuggestionOnSuccess, [{ shouldAppend: false }, 'response']]
  ];
  ajax('/suggestions', 'GET', functionsOnSuccess);
}

function getMoreSuggestions() {
  // Optional: Depends on how you handle the "Load more"-Functionality
  // your code here...
  var functionsOnSuccess = [
    [manageSuggestionOnSuccess, [{ shouldAppend: true }, 'response']]
  ];
  connectionsInCommonSkeleton.removeClass('d-none')
  loadMoreBtnParent.addClass('d-none')
  ajax(nextPageUrl, 'GET', functionsOnSuccess, undefined);
}

function sendRequest(userId, suggestionId) {
  var functionsOnSuccess = [
    [manageSendRequest, [{ suggestionId: suggestionId }, 'response']]
  ];

  $(`#create_request_btn_${suggestionId}`).prop('disabled', true) //disbla button to prevent send multiple request while the first request is not completed yet

  ajax(`/connect/${suggestionId}`, 'POST', functionsOnSuccess, undefined);

  // your code here...
}

function deleteRequest(userId, requestId) {
  // your code here...
  var functionsOnSuccess = [
    [manageDeleteRequest, [{ requestId: requestId }, 'response']]
  ];

  $(`#cancel_request_btn_${requestId}`).prop('disabled', true) //disbla button to prevent send multiple request while the first request is not completed yet

  ajax(`/requests/${requestId}`, 'DELETE', functionsOnSuccess, undefined);
}

function acceptRequest(userId, requestId) {

  var functionsOnSuccess = [
    [manageDeleteRequest, [{ requestId: requestId }, 'response']]
  ];

  $(`#accept_request_btn_${requestId}`).prop('disabled', true) //disbla button to prevent send multiple request while the first request is not completed yet

  ajax(`/requests/${requestId}`, 'POST', functionsOnSuccess, undefined);
}

function removeConnection(userId, connectionId) {
  // your code here...
  var functionsOnSuccess = [
    [manageRemoveConnectionRequest, [{ connectionId: connectionId }, 'response']]
  ];

  $(`#create_request_btn_${connectionId}`).prop('disabled', true) //disbla button to prevent send multiple request while the first request is not completed yet

  ajax(`/connection/${connectionId}`, 'DELETE', functionsOnSuccess, undefined);
}

function loadMoreData() {
  //detect and load selected tab data
  const selectedTab = $('input[name="btnradio"]:checked').val();
  switch (selectedTab) {
    case 'suggestions':
      getMoreSuggestions()
      break;

    case 'sent':
      getMoreRequests('sent')
      break;

    case 'received':
      getMoreRequests('received')
      break;


    case 'connections':
      getMoreConnections()
      break;

    default:
      break;
  }


}

$(function () {
  getSuggestions();
});