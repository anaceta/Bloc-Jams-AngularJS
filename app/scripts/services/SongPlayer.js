(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        // Private Attributes

        /**
         * @desc Stores current album
         * @type {Object}
         */

        var currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Buzz object audio file
         * @type {Object}
         */

        var currentBuzzObject = null;

        // Private Functions

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /**
         * @function playSong
         * @desc Plays whatever file is currentBuzzObject and changes status to playing
         * @param {Object} song
         */

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
         * @function stopSong
         * @desc Stops the audio file of currentBuzzObject and sets current song status to null
         * @param {Object} song
         */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        };

        /**
         * @function getSongIndex
         * @desc Gets index of chosen song from current album array
         * @param {Object} song
         */

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        // Public Attributes

        /**
         * @desc Current song
         * @type {Object}
         */

        SongPlayer.currentSong = null;

        // Public Functions

        /**
         * @function SongPlayer.play
         * @desc Changes song status to playing, if new song - plays new song, if paused, plays paused song
         * @param {Object} song
         */

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
         * @function SongPlayer.pause
         * @desc Pauses current song and changes song status to reflect that
         * @param {Object} song
         */

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
         * @function SongPlayer.previous
         * @desc Stops current song to play previous song
         * @param {Object} song
         */

        SongPlayer.previous = function() {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;

        if (currentSongIndex < 0) {
                stopSong(SongPlayer.currentSong);
        } else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };

        /**
         * @function SongPlayer.next
         * @desc Stops current song to play next song
         * @param {Object} song
         */

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > currentAlbum.songs.length - 1) {
                stopSong(SongPlayer.currentSong);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

    return SongPlayer;
}

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
