// Generated by CoffeeScript 1.6.2
(function() {
  var ChannelBuffer, ChatBuffer,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  ChatBuffer = require('./chat_buffer');

  ChannelBuffer = (function(_super) {
    __extends(ChannelBuffer, _super);

    ChannelBuffer.prototype.type = 'channel';

    ChannelBuffer.prototype.members = {};

    function ChannelBuffer(connection, info) {
      ChannelBuffer.__super__.constructor.call(this, connection, info);
      this.autoJoin = info.auto_join;
    }

    ChannelBuffer.prototype.setJoined = function(joined, callback) {
      var _this = this;

      return this.unarchive(function() {
        return _this.connection.engine.db.setBufferAutoJoin(_this.connection.id, _this.id, joined, function() {
          _this.isJoined = joined;
          _this.autoJoin = joined;
          if (!joined) {
            _this.members = {};
          }
          return callback();
        });
      });
    };

    ChannelBuffer.prototype.setMembers = function(nicks) {
      var nick, _i, _len, _results;

      this.members = {};
      _results = [];
      for (_i = 0, _len = nicks.length; _i < _len; _i++) {
        nick = nicks[_i];
        _results.push(this.addMember(nick));
      }
      return _results;
    };

    ChannelBuffer.prototype.addMember = function(nick) {
      return this.members[nick] = {
        nick: nick,
        realName: '',
        host: ''
      };
    };

    ChannelBuffer.prototype.renameMember = function(oldNick, newNick) {
      this.removeMember(oldNick);
      return this.addMember(newNick);
    };

    ChannelBuffer.prototype.removeMember = function(nick) {
      return delete this.members[nick];
    };

    ChannelBuffer.prototype.archive = function(callback) {
      if (this instanceof ChannelBuffer && this.isJoined) {
        return callback();
      }
      return ChannelBuffer.__super__.archive.call(this, callback);
    };

    return ChannelBuffer;

  })(ChatBuffer);

  module.exports = ChannelBuffer;

}).call(this);
