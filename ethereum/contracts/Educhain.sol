pragma solidity ^0.4.17;

contract IssuerFactory {
    address[] public issuers;

    function createNewIssuer(string name) public {
        require(bytes(name).length != 0);

        address newIssuer = new Issuer(msg.sender, name);
        issuers.push(newIssuer);
    }

    function getIssuers() public view returns (address[]) {
        return issuers;
    }
}

contract Issuer {
    struct Certificate {
        uint id;
        string description;
        string issuingAuthority;
        string recipientID;
        uint issuingDate;
        string typeOfCertificate;
        string details;
    }

    address public issuer;
    string public issuerName;
    Certificate[] public certificates;

    modifier restricted() {
        require(msg.sender == issuer);
        _;
    }

    function Issuer(address creator, string name) public {
        issuer = creator;
        issuerName = name;
    }

    function generateID(string recipientID, string issuingAuthority) private view returns (uint) {
        return uint(keccak256(recipientID, issuingAuthority, now));
    }

    function issueCertificate(string description, string issuingAuthority, string recipientID,
        string typeOfCertificate, string details) public restricted {
        Certificate memory newCertificate = Certificate({
           id: generateID(recipientID, issuingAuthority),
           description: description,
           issuingAuthority: issuingAuthority,
           recipientID: recipientID,
           issuingDate: now,
           typeOfCertificate: typeOfCertificate,
           details: details
        });

        certificates.push(newCertificate);
    }
}
