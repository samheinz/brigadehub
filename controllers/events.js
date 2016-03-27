var Events = require('../models/Events')

module.exports = {
  /**
   * GET /events
   * List of Event examples.
   */
  getEvents: function (req, res) {
    Events.find({}, function (err, foundEvents) {
      if (err) console.error(err)
      res.render(res.locals.brigade.theme.slug + '/views/events/index', {
        events: foundEvents,
        upcomingevents: foundEvents.slice(0, 10),
        title: 'Events',
        brigade: res.locals.brigade
      })
    })
  },
  /**
   * GET /events/manage
   * Manage Events.
   */
  getEventsManage: function (req, res) {
    Events.find({}, function (err, foundEvents) {
      res.render(res.locals.brigade.theme.slug + '/views/events/manage', {
        title: 'Manage Events',
        allEvents: foundEvents,
        brigade: res.locals.brigade
      })
    }).sort({start: 1})

  },
  /**
   * POST /events/manage
   * Update all Events.
   */
  postEventsManage: function (req, res) {
    res.redirect('Events/manage')
  },
  /**
   * GET /events/new
   * New Events.
   */
  getEventsNew: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/new', {
      title: 'New Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /events/new
   * Submit New Events.
   */
  postEventsNew: function (req, res) {
    res.redirect('events/new')
  },

  /**
   * GET /events/:eventID
   * Display Event by ID.
   */
  getEventsID: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/event', {
      eventID: req.params.eventID,
      title: 'Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * GET /events/:eventID/settings
   * IDSettings Events.
   */
  getEventsIDSettings: function (req, res) {
    res.render(res.locals.brigade.theme.slug + '/views/events/settings', {
      eventID: req.params.eventID,
      title: 'IDSettings Events',
      brigade: res.locals.brigade
    })
  },
  /**
   * POST /events/:eventID/settings
   * Submit IDSettings Events.
   */
  postEventsIDSettings: function (req, res) {
    res.redirect('Events/' + req.params.eventID + '/settings')
  },
  /**
   * POST /events/sync
   * Sync Events.
   */
  postEventsSync: function (req, res) {
    var meetupid = res.locals.brigade.meetup.split('.com/')[1].replace(/\//g, '')
    var url = 'https://api.meetup.com/2/events?&sign=true&photo-host=public&group_urlname=' + meetupid + '&page=50'
    Events.fetchMeetupEvents(url).then(function (value) {
      req.flash('success', { msg: 'Success! You have successfully synced events from Meetup.' })
      res.redirect('/events/manage')
    })
  },
  /**
   * POST /events/:eventID/settings
   * Submit IDSettings Events.
   */
  postEventsIDSync: function (req, res) {
    res.redirect('Events/' + req.params.eventID + '/settings')
  },

  postDeleteEvent: function (req, res) {
    Events.remove({ id: req.params.eventId }, function (err) {
      if (err) {
        return next(err)
      }
      res.redirect('/events/manage')
    })
  }
}
