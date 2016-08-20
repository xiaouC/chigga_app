import React, { Component } from 'react';

var common = require('./common.js');

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

        fetch( url, fetchOptions )
            .then( (response) => {
                if( response.status != 200 ) {
                    return common.request_error;
                }

                return response.text();
            }).then( (responseText) => {
                if( parse_json ) {
                    callback( JSON.parse( responseText ) );
                } else {
                    callback( responseText );
                }
            }).catch(function(err){
                alert(err);
            }).done();
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

        alert( '' + url );
        fetch( url, fetchOptions )
            .then( (response) => {
                if( response.status != 200 ) {
                    return common.request_error;
                }

                return response.text();
            }).then( (responseText) => {
                if( parse_json ) {
                    callback( JSON.parse( responseText ) );
                } else {
                    callback( responseText );
                }
            }).catch(function(err){
                alert(err);
            }).done();
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

        fetch( url, fetchOptions )
            .then( (response) => {
                if( response.status != 200 ) {
                    return common.request_error;
                }

                return response.text();
            }).then( (responseText) => {
                if( parse_json ) {
                    callback( JSON.parse( responseText ) );
                } else {
                    callback( responseText );
                }
            }).catch(function(err){
                alert(err);
            }).done();
    }

    static get( url, parse_json, callback ) {
        fetch( url )
            .then( (response) => {
                if( response.status != 200 ) {
                    return 'http code : ' + response.status + ', ' + common.request_error;
                }

                return response.text() 
            }).then( (responseText) => {
                if( parse_json ) {
                    callback( JSON.parse( responseText ) );
                } else {
                    callback( responseText );
                }
            }).catch(function(err){
                alert(err);
            }).done();
    }
}

module.exports = NetUitl;
