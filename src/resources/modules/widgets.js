'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Widget = mongoose.model('Widgets');

module.exports = function (app, config) {
    app.use('/api', router);

    router.route('/widgets').get((req, res, next) => {
        logger.log('info', 'Get all Widgets');
        var query = Widget.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if (result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No Widgets" });
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/widgets/:id').get((req, res, next) => {
        logger.log('info', 'Get Widget %s', req.params.id);
        Widget.findById(req.params.id)
            .then(result => {
                if (result) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({ message: "No widget found" });
                }
            })
            .catch(error => {
                return next(error);
            });
    });

    router.route('/widgets/:id').put((req, res, next) => {
        logger.log('info', 'Get Widget %s', req.params.id);
        Widget.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, multi: false })
            .then(result => {
                res.status(200).json(result);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.route('/widgets').post((req, res, next) => {
        logger.log('info', 'Create Widget');
        var widget = new Widget(req.body);
        widget.save()
            .then(result => {
                res.status(201).json(result);
            })
            .catch(err => {
                return next(err);
            });
    });

    router.route('/widgets/:id').delete((req, res, next) => {
        logger.log('info', 'Delete Widget ' + req.params.id);
        Widget.remove({ _id: req.params.id })
            .then(todo => {
                res.status(200).json({ msg: "Widget Deleted" });
            })
            .catch(error => {
                return next(error);
            });

    });

};
import { inject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { widgets } from '../resources/data/widgets-object';
@inject(widgets)

export class widgets {
  constructor(widgets) {
    this.widgets = widgets;
    this.userObj = JSON.parse(sessionStorage.getItem('userObj'));
    this.statuses = ['widgets', 'In Process', 'Completed'];
    this.isCheckedCompleted = true;
  }
  async attached() {
    await this.getwidgets();
  }
  async getwidgets() {
    await this.widgets.getwidgets(this.userObj._id);
    this.showForm = false;
  }

  updatewidgets(widgets) {
    this.widgets.selectedwidgets = widgets;
    this.savodo();
  }
  newwidgets() {
    this.widgets.newwidgets(this.userObj._id);
    this.showForm = true;
  }
  editwidgets(widgets) {
    this.widgets.selectedwidgets = widgets;
    this.showForm = true;
  }

  async savewidgets() {
    await this.widgets.savewidgets();
    this.getwidgets();
  }
  async deletewidgets(widgets) {
    await this.widgets.deletewidgets(widgets._id);
    this.getwidgets();
  }

  Cancel() {
    this.showForm = false;
  }
}
