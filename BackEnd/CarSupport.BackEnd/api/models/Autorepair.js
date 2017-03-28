/**
 * Autorepair.js
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
            required:true
        },
        Name: 
        {
            type: 'string',
            required: true,
            size: 45
        },
        Address:  {
            type: 'string',
            required: true,
            size: 45
        },
        Phone:  {
            type: 'string',
            required: true,
            size: 45
        },
        Location:  {
            type: 'string',
            required: true,
            size: 45
        },
        Breakdown: {
            model: "Breakdown",
            columnName: "BreakdownId"
        }
    }
};

