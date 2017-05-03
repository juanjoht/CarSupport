/**
 * Breakdown.js
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
            size: 80
        },
        Description: {
            type: 'string',
            required: true,
            size: 800
        },
        Causes: {
            type: 'string',
            required: true,
            size: 1000
        },
        Consequences: {
            type: 'string',
            required: true,
            size: 1000
        },
        Solutions: {
            type: 'string',
            required: true,
            size: 1000
        },
        FrecuentFault: 'boolean',
        PathImage: {
            type: 'string',
            required: true,
            size: 80
        },
        Rating: 'float',
        Part: {
            model: "Part",
            columnName: "PartId"
        }
    }
};