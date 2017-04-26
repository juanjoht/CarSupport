/**
 * Part.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

    attributes: {
        Id: {
            type: 'integer',
            primaryKey: true,
            autoIncrement: true,
            required: true
        },
        Name: {
            type: 'string',
            required: true,
            size: 45
        },
        Description: {
            type: 'string',
            required: true,
            size: 500
        },
        Path: {
            type: 'string',
            required: true,
            size: 80
        },
        ShowScheme: 'boolean'
    }
};