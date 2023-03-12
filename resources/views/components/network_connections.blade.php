<div class="row justify-content-center mt-5">
    <div class="col-12">
        <div class="card shadow  text-white bg-dark">
            <div class="card-header">Coding Challenge - Network connections</div>
            <div class="card-body">
                <div class="btn-group w-100 mb-3" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" class="btn-check" name="btnradio" id="btnradio1" value="suggestions"
                        onchange="getSuggestions()" autocomplete="off" checked>
                    <label class="btn btn-outline-primary" for="btnradio1" id="get_suggestions_btn">Suggestions ({{$suggestionsCount}})</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio2" value="sent"
                        onchange="getRequests('sent')" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio2" id="get_sent_requests_btn">Sent Requests
                        ({{$sentRequestsCount}})</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio3"
                        onchange="getRequests('received')" value="received"autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio3" id="get_received_requests_btn">Received
                        Requests({{$receivedRequestsCount}})</label>

                    <input type="radio" class="btn-check" name="btnradio" id="btnradio4" value="connections"
                        onchange="getConnections()" autocomplete="off">
                    <label class="btn btn-outline-primary" for="btnradio4" id="get_connections_btn">Connections
                        ({{$connectionCount}})</label>
                </div>
                <hr>
                <div id="content" class="d-none">
                    {{-- Display data here --}}
                </div>



                <div class="d-flex justify-content-center mt-2 py-3 {{-- d-none --}}" id="load_more_btn_parent">
                    <button class="btn btn-primary" onclick="loadMoreData()" id="load_more_btn">Load more</button>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- Remove this when you start working, just to show you the different components --}}

<div id="connections_in_common_skeleton" class="d-none">
    <br>
    <span class="fw-bold text-white">Loading More Data</span>
    <div class="px-2">

        <x-skeleton />
    </div>
</div>
