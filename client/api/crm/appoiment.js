AppoimentSchema = new SimpleSchema({

  desc: {
      type: String,
      label: "Description",
      max: 1000,
      autoform: {
        afFieldInput: {
          type: "textarea",
          rows: 4,
          class: "materialize-textarea"
        }
      }
  },
  summary:{
      type: String,
      label:"Summary",
      max: 900,
      autoform: {
        afFieldInput: {
          type: "textarea",
          rows: 4,
          class: "materialize-textarea"
        }
      }
  },
  type:{
      type: String,
      label:"Type",
      allowedValues: ['Email','Task','Meeting','Call'],
      optional: false,
      autoform: {
          afFieldInput: {
              class: 'type'
          },
          options: [
            {label: "Send Email", value: 'Email'},
            {label: "Create Task", value: 'Task'},
            {label: "Create Meeting", value: 'Meeting'},
            {label: "Make Call", value: 'Call'}
          ]
        }
  },
  account_id:{
      type: String,
      label: "Account",
      optional:true,
      autoValue: function(){

          if (Meteor.isClient) {
              currentAuthor = Session.get('currentAccount')
              return currentAuthor;
          };
      },
      autoform: {
          type: "hidden"
      }
  },
  record_id:{
      type: String,
      label: "Record Id",
      optional:true,
      autoValue: function(){

          if (Meteor.isClient) {
              currentAuthor = Session.get('currentAccount')
              return currentAuthor;
          };
      },
      autoform: {
          type: "hidden"
      }
  },
  author: {
      type: String,
      label: "Author",
      autoValue: function(){
          return this.userId
      },
      autoform: {
          type: "hidden"
      }
  },
  createdAt: {
      type: Date,
      label: "Created At",
      autoValue: function(){
          return new Date()
      },
      autoform: {
          type: "hidden"
      }
  },
  date:{
      type: Date,
      label: "Date",
      autoform: {
          //type:"hidden"
          //  type: "bootstrap-datepicker",
      //  datePickerOptions: {
      //    autoclose: true
      //  }
      }
  },
  status: {
      type:String,
      allowedValues: ['Open','Close','Done'],
      autoform: {

          options: [
            {label: "Open", value: 'Open'},
            {label: "Close", value: 'Close'},
            {label: "Done", value: 'Done'}
          ]
        }
  },
  email: {
      type: Schema.Email,
      optional:true,
  },
  task:{
      type: Schema.Task,
      optional:true
  }
});
