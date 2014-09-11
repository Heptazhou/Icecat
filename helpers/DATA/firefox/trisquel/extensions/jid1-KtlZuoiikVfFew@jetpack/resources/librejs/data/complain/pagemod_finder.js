/**
 * GNU LibreJS - A browser add-on to block nonfree nontrivial JavaScript.
 * *
 * Copyright (C) 2011, 2012 Loic J. Duros
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see  <http://www.gnu.org/licenses/>.
 *
 */


var pageModFinder = {

  
  image: null,

  stylesheet: null,

  button: null,

  displayPanel: false,

  links: null,

  box: null,

  infoBox: null,

  init: function () {

	  var that = this, le;

	  this.links = [];


	  self.on('message', function (respData) {
		  
		  if (respData.event === 'assets-uri') {
			  that.setComplaintPanel(respData.value);
		  } 
		  
		  else if (respData.event === 'page-url') {

			  // search for contact list. Top level.
			  contactFinder.init();
			  //console.debug('page url is', respData.value);
			  contactFinder.searchForContactLink(respData.value);

		  }

		  else if (respData.contact !== undefined){ 
			  that.displayLinkByPriority(respData);
		  }
		});

  },

  /**
   * setComplaintPanel
   *
   * Create complaint panel and assign properties to the 
   * dom elements.
   *    
   */
  setComplaintPanel: function (uri) {
	  
	  // provide uri of stylesheet
	  this.stylesheet = uri + 'css/style.css';

	  // add stylesheet.
	  $('head').append($('<link/>').attr({'rel': 'stylesheet',
					                              'href': this.stylesheet, 
					                              'type': 'text/css'}));

	  $('body').prepend('<div id="librejs-complaint-box" style="display:none">' +
			                '\n\n      ' +
			                '<a id="librejs-tab-button" href="#" title="LibreJS -- Complain to this site">LibreJS -- Complain to this site.</a>' +
			                '\n\n      ' +
			                '<div id="librejs-complaint-info">' +
			                '\n\n	' +
			                '<h1 title="Nonfree JavaScript -- Complain">\n	Nonfree JavaScript Complain\n	</h1>' +
			                '\n\n' +
			                '<p id="librejs-time-mention">Searching for contact links in this website...</p>' +
			                '\n\n' +
			                '<div id="librejs-complaint-info-text">' +

			                '<h2>Emails you should use</h2>' +
			                '<ul id="librejs-certain-emails"></ul>' +

			                '<h2>Non-webmaster Emails you might want to use</h2>' +
			                '<ul id="librejs-uncertain-emails"></ul>' +

			                '<h2>Contact form or useful Contact Information</h2>' +
			                '<ul id="librejs-certain-links"></ul>' +

			                '<h2>Twitter Links</h2>' +
			                '<ul id="librejs-twitter-links"></ul>' +

			                '<h2>Identi.ca Links</h2>' +
			                '<ul id="librejs-identica-links"></ul>' +

			                '<h2>May be of interest</h2>' +
			                '<ul id="librejs-uncertain-links"></ul>' +

			                '<h2>May be of interest</h2>' +
			                '<ul id="librejs-probable-links"></ul>' +

			                '<h2>Phone Numbers</h2>' +
			                '<ul id="librejs-phone-numbers"></ul>' +

			                '<h2>Snail Mail Addresses</h2>' +
			                '<ul id="librejs-snail-addresses"></ul>' +
			                '</div>' +
			                ' </div></div>');

	  // main elements of the complaint panel.
	  this.infoBox = $('#librejs-complaint-info');
	  this.infoBoxText = $('#librejs-complaint-info-text');

	  // all lists.
	  this.certainEmails = $("#librejs-certain-emails");
	  this.uncertainEmails = $("#librejs-uncertain-emails");
	  this.certainLinks = $("#librejs-certain-links");
	  this.uncertainLinks = $("#librejs-uncertain-links");
	  this.probableLinks = $("#librejs-probable-links");
	  this.twitterLinks = $("#librejs-twitter-links");
	  this.identicaLinks = $("#librejs-identica-links");
	  this.phoneNumbers = $("#librejs-phone-numbers");
	  this.snailAddresses = $("#librejs-snail-addresses");
	  
	  this.button = $('#librejs-tab-button');
	  this.box = $('#librejs-complaint-box');
	  
	  this.infoBox.height(window.innerHeight / 1.3);
	  this.infoBoxText.height(this.infoBox.height() - 150);

  },


  /**
   *
   *  displayLinkByPriority
   * 
   *  Place the link in the correct list depending
   *  on the correct
   */
  displayLinkByPriority: function (respData) {
	  
	  // we have a link to show. Add it to the button.
	  // first time finalLinkFound is triggered.
	  if (this.displayPanel === false) {

	    this.addComplaintOverlay();
	    this.displayPanel = true;
	    this.hideBox(true);
	  }

	  // check link isn't already added.
	  if (respData.contact !== undefined && 
	      !this.isInLinks(respData.contact.link)) {
	    
	    // push link to list.
	    le = this.links.push(respData);
	    
	    // making sure this is the latest link added.
	    this.addALinkToPanel(this.links[le -1]);
	    
	  }


  },

  isInLinks: function (searchValue) {
	  var i = 0,
	      le = this.links.length;
	  
	  for (; i < le; i++) {

	    if (this.links[i].contact.link.replace(/\/$/, '') === searchValue.replace(/\/$/, '')) {
		    return true;
	    }
	  } 

	  // no match has been found.
	  return false;
	  
  },

  /**
   *  addALinkToPanel
   *
   *  Check the type of link and place it in the
   *  appropriate list in the complaint panel.
   *   
   */
  addALinkToPanel: function (link) {

	  var listElem;

	  switch (link.event) {
	    
	  case linkTypes.CERTAIN_EMAIL_ADDRESS_FOUND:
	    listElem = this.certainEmails;
	    break;
	    
	  case linkTypes.UNCERTAIN_EMAIL_ADDRESS_FOUND:
	    listElem = this.uncertainEmails;
	    break;

	  case linkTypes.CERTAIN_LINK_FOUND:
	    listElem = this.certainLinks;
	    break;

	  case linkTypes.PROBABLE_LINK_FOUND:
	    listElem = this.probableLinks;
	    break;

	  case linkTypes.UNCERTAIN_LINK_FOUND:
	    listElem = this.uncertainLinks;
	    break;
	    
	  case linkTypes.TWITTER_LINK_FOUND:
	    listElem = this.twitterLinks;
	    break;
	    
	  case linkTypes.IDENTICA_LINK_FOUND:
	    listElem = this.identicaLinks;
	    break;
	    
	  case linkTypes.PHONE_NUMBER_FOUND:
	    listElem = this.phoneNumbers;
 	    break;
	    
	  case linkTypes.SNAIL_ADDRESS_FOUND:
	    listElem = this.snailAddresses;
	    break;	    
	  }

	  listElem.prev('h2').css({'display': 'block'});
	  listElem.append($('<li/>').append($('<a/>').attr({'href': link.contact.link,
							                                        'target': '_blank'}).text(link.contact.label)));

	  
  },
  
  addComplaintOverlay: function () {
	  var that = this;
	  
	  this.button.bind('mouseenter', function () { that.showBox(); });

	  this.box.bind('mouseleave', function () { that.hideBox(); });

	  this.button.bind('focus', function () { that.showBox(); });
	  this.box.bind('blur', function () { that.hideBox(); });

	  this.box.css({'display': 'block'});

	  //this.hideBox(true);
  },

  showBox: function () {
	  this.box.stop().animate({
	    right: '-5px'
	  }, {queue: false, duration: 1500, easing: 'easeInOutQuart'});
  },

  hideBox: function (hint) {
	  var rightMargin = '-550px';

	  if (hint) {
	    rightMargin = '-530px';
	  }

	  this.box.stop().delay(10000).animate({
	    right: rightMargin
	  }, {queue:false, duration: 1500, easing: 'easeInOutQuart'});

  }
  

};
