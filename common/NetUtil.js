import React, { Component } from 'react';

var common = require('./common.js');

var process_fetch = function( url, fetch_options, parse_json, callback ) {
    fetch( url, fetch_options )
        .then( (response) => {
            if( response.status != 200 ) {
                return common.request_error;
            }

            return response.text();
        }).then( (responseText) => {
            console.log( 'fly responseText : ' + responseText );
            if( parse_json ) {
                var rsp_json_data = JSON.parse( responseText );

                if( rsp_json_data['error'] != 0 ) {
                    alert( responseText );
                    //common.error_report( rsp_json_data['error'], rsp_json_data['message'] );

                    return;
                }

                callback( rsp_json_data );
            } else {
                callback( responseText );
            }
        }).catch(function(err){
            alert(err);
        }).done();
};

class NetUitl extends React.Component {
    static postFrom( url, data, parse_json, callback ) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'data=' + data + ''
        };

        process_fetch( url, fetchOptions, parse_json, callback );
    }

    static postJson( url, data, parse_json, callback ) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        };

        process_fetch( url, fetchOptions, parse_json, callback );
    }

    static putJson( url, data, parse_json, callback ) {
        var fetchOptions = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        };

        process_fetch( url, fetchOptions, parse_json, callback );
    }

    static get( url, parse_json, callback ) {
        process_fetch( url, null, parse_json, callback );
    }
}

module.exports = NetUitl;
