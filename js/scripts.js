// Business Logic for AddressBook ---------

function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}


// Business Logic for Contacts ---------

function Contact(firstName, lastName, phoneNumber, emailAddress) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emailAddress = emailAddress
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

function Address(streetAddress, city, state, zipcode){
  this.streetAddress = streetAddress,
  this.city = city,
  this.state = state,
  this.zipcode = zipcode
}


// User Interface Logic ---------

var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".street-address").html(contact.physicalAddress.streetAddress);
  $(".city").html(contact.physicalAddress.city);
  $(".state").html(contact.physicalAddress.state);
  $(".zipcode").html(contact.physicalAddress.zipcode);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputedEmailAddress = $("input#new-email-address").val();
    var inputedStreetAddress = $("input#new-street-address").val();
    var inputedCity = $("input#new-city").val();
    var inputedState = $("input#new-state").val();
    var inputedZipcode = $("input#new-zipcode").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-street-address").val("");
    $("input#new-city").val("");
    $("input#new-state").val("");
    $("input#new-zipcode").val("");

    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputedEmailAddress);

    var newAddress = new Address(inputedStreetAddress, inputedCity, inputedState, inputedZipcode);

    newContact.physicalAddress = newAddress;

    addressBook.addContact(newContact);

    displayContactDetails(addressBook);
    
  });
});
