let expect = require("chai").expect;
let smss = require("../services/smss");
let sessions = require("../services/sessions");

describe("test send smss", function() {    
    it("normal", function() {
        smss.send(
            {
                from: "leon", 
                to:"61406892349, 61420776067", 
                message: "to your guys"
            }, function (err, data){
                expect(err).to.be.null;
            })
    });
});
