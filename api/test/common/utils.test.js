const expect = require('chai').expect;
const utils  = require('../../common/utils');

describe('Test common/utils', () => {

  describe('Test isObject()', () => {
    it('should be an objectId', () => {
      expect(utils.isObjectId('a'.repeat(24))).to.be.true;
    });
    it('should be not an objectId', () => {
      expect(utils.isObjectId('test')).to.be.false;
    });
  });

  describe('Test escape()', () => {
    it('should replace html character', () => {
      expect(utils.escape('<')).to.equal('&lt;');
      expect(utils.escape('>')).to.equal('&gt;');
      expect(utils.escape('\'')).to.equal('&#39;');
      expect(utils.escape('"')).to.equal('&quot;');
      expect(utils.escape('&')).to.equal('&amp;');
      expect(utils.escape('\t')).to.equal('&nbsp;'.repeat(4));
      expect(utils.escape('\r')).to.equal('');
      expect(utils.escape('\n')).to.equal('<br>');
      expect(utils.escape(' ')).to.equal(' ');
      expect(utils.escape('  ')).to.equal('&nbsp;'.repeat(2));
    });
    it('should escape html string', () => {
      const html1 = `<script>alert('hello world');</script>`;
      const escape1 = `&lt;script&gt;alert(&#39;hello world&#39;);&lt;/script&gt;`;
      expect(utils.escape(html1)).to.equal(escape1);

      const html2 = 'Here is the first line\r\nHere is the second line';
      const escape2 = 'Here is the first line<br>Here is the second line';
      expect(utils.escape(html2)).to.equal(escape2);
    })
  });

  describe('Test utils.isValidName()', () => {
    it('should be true', () => {
      expect(utils.isValidName('test')).to.be.true;
      expect(utils.isValidName('姓名')).to.be.true;
      expect(utils.isValidName('test test')).to.be.true;
      expect(utils.isValidName('te_s-t')).to.be.true;
    })
    it('should be false', () => {
      expect(utils.isValidName('   ')).to.be.false;
    })
  })

  describe('Test utils.isValidEmail()', () => {
    it('should be true', () => {
      expect(utils.isValidEmail('a@a.com')).to.be.true;
      expect(utils.isValidEmail('123456@qq.com')).to.be.true;
      expect(utils.isValidEmail('haha@163.com')).to.be.true;
      expect(utils.isValidEmail('haha@vip.163.com')).to.be.true;
      expect(utils.isValidEmail('haha-h_ehe@qq.com')).to.be.true;
    })
    it('should be false', () => {
      expect(utils.isValidEmail('haha@.com')).to.be.false;
      expect(utils.isValidEmail('haha@.haha.com')).to.be.false;
      expect(utils.isValidEmail('+test@qq.com')).to.be.false;
      expect(utils.isValidEmail(' a@qq.com ')).to.be.false;
      expect(utils.isValidEmail('te st@qq.com')).to.be.false;
      expect(utils.isValidEmail('test@qq.co m')).to.be.false;
      expect(utils.isValidEmail('test.com')).to.be.false;
    })
  })

  describe('Test utils.isValidUrl()', () => {
    it('should be true', () => {
      expect(utils.isValidUrl('123.com')).to.be.true;
      expect(utils.isValidUrl('z.cn')).to.be.true;
      expect(utils.isValidUrl('dremy.cn')).to.be.true;
      expect(utils.isValidUrl('www.dremy.cn')).to.be.true;
      expect(utils.isValidUrl('http://haha.com')).to.be.true;
      expect(utils.isValidUrl('https://test123.com')).to.be.true;
    });
    it('should be false', () => {
      expect(utils.isValidUrl('123')).to.be.false;
      expect(utils.isValidUrl('test.123')).to.be.false;
    });
  });

  describe('Test utils.verifyUesrForm()', () => {
    it('should not throw HttpError', () => {
      expect(utils.verifyUserForm.bind(utils,{name:'test',email:'a@a.com'})).to.not.throw(/Url/);
    });
    it('should throw HttpError', () => {
      expect(utils.verifyUserForm.bind(utils,{name:'',email:'',url:''})).to.throw(/Name/);
      expect(utils.verifyUserForm.bind(utils,{name:'test',email:'',url:''})).to.throw(/Email/);
      expect(utils.verifyUserForm.bind(utils,{name:'test',email:'a@a.com',url:'haha'})).to.throw(/Url/);
    });
  });

  describe('Tset utils.md5()', () => {
    it('Create right md5 hash', () => {
      expect(utils.md5('123456')).to.equal('e10adc3949ba59abbe56e057f20f883e');
    });
  });
});