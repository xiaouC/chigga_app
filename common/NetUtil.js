import React, { Component } from 'react';

var common = require('./common.js');

class NetUitl extends React.Component {
    static postFrom( url, data, callback ) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'data=' + data + ''
        };

        fetch( url, fetchOptions )
            .then( (response) => response.text() )
            .then( (responseText) => {
                //callback( responseText );
                callback( JSON.parse( responseText ) );
            }).done();
    }

    static postJson( url, data, callback ) {
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
            .then( (response) => response.text() )
            .then( (responseText) => {
                //alert( responseText );
                callback( JSON.parse( responseText ) );
            }).done();
    }

    static putJson( url, data, callback ) {
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
                //alert( responseText );
                callback( JSON.parse( responseText ) );
            }).catch(function(err){
                alert(err);
            }).done();
    }

    static get( url, callback ) {
        fetch( url )
            .then( (response) => response.text() )
            .then( (responseText) => {
                //callback( responseText );
                callback( JSON.parse( responseText ) );
            }).done();
    }
}

module.exports = NetUitl;
