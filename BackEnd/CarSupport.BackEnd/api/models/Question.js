/**
 * Question.js
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
        Description: {
            type: 'string',
            required: true,
            size: 45
        },
        Part: {
            model: "Part",
            columnName: "PartId"
        },
        DescriptionOpcion1: {
            type: 'string',
            size: 45
        },
        RutaOpcion1: {
            type: 'string',
            size: 80
        },
        DescriptionOpcion2: {
            type: 'string',
            size: 45
        },
        RutaOpcion2: {
            type: 'string',
            size: 80
        },
        DescriptionOpcion3: {
            type: 'string',
            size: 45
        },
        RutaOpcion3: {
            type: 'string',
            size: 80
        },
        DescriptionOpcion4: {
            type: 'string',
            size: 45
        },
        RutaOpcion4: {
            type: 'string',
            size: 80
        },

    }
};