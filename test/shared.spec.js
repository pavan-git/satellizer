describe('satellizer.shared', function() {

  beforeEach(module('satellizer'));

  beforeEach(inject(['$q', '$httpBackend', '$location', '$window', 'satellizer.shared', 'satellizer.config',
    function($q, $httpBackend, $location, $window, shared, config) {
      this.$q = $q;
      this.$httpBackend = $httpBackend;
      this.$location = $location;
      this.$window = $window;
      this.shared = shared;
      this.config = config;
    }]));

  describe('logout()', function() {

    it('should be defined', function() {
      expect(this.shared.logout).toBeDefined();
    });

    it('should log out a user', function() {
      var tokenName = [this.config.tokenPrefix, this.config.tokenName].join('_');
      this.shared.logout();
      expect(this.$window.localStorage[tokenName]).toBeUndefined();
      expect(this.$location.path()).toEqual(this.config.logoutRedirect);
    });

  });

  describe('isAuthenticated()', function() {

    it('should be defined', function() {
      expect(this.shared.isAuthenticated).toBeDefined();
      expect(angular.isFunction(this.shared.isAuthenticated)).toBe(true);
    });

    it('test coverage', function() {
      var tokenName = [this.config.tokenPrefix, this.config.tokenName].join('_');
      localStorage.setItem(tokenName, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyMzQ1Njc4OTAsIm5hbWUiOiJKb2huIERvZSJ9.kRkUHzvZMWXjgB4zkO3d6P1imkdp0ogebLuxnTCiYUU');
      expect(this.shared.isAuthenticated()).toBe(false);
    });


  });

  describe('parseUser()', function() {

    it('should not redirect if loginRedirect is null', function() {
      var deferred = this.$q.defer();
      var response = {
        data: {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb…YzMn0.YATZN37JENCQWeNAoN4M7KxJl7OAIJL4ka_fSM_gYkE'
        }
      };
      this.config.loginRedirect = null;

      this.shared.saveToken(response, deferred);

      expect(this.$location.path()).toBe('');
    });

  });


});