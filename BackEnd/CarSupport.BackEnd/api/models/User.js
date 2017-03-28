/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      Id:{
          type: 'integer',
          primaryKey: true,
          autoIncrement: true,
          required:true
      },
      IdentificationNumber:
      {
          type: 'string',
          required: true,
          size: 45
      },
      FullName: {
          type: 'string',
          required: true,
          size: 150
      },
      Email: {
          type: 'string',
          required: true,
          size: 45
          
      },
      Phone: {
          type: 'string',
          size: 45
      },
      CellPhone: {
          type: 'string',
          size: 45
      },
      Username: {
          type: 'string',
          unique: true,
          size: 45
        },
      Password: {
       type: 'string',
       required: true,
        size: 45  
      }
      
  }
};

