pragma solidity ^0.4.17;

contract IssueCertificates {
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
    Certificate[] public certificates;

    modifier restricted() {
        require(msg.sender == issuer);
        _;
    }

    function Issuer() public {
        issuer = msg.sender;
    }

    function generateID(string recipientID, string issuingAuthority) private view returns (uint) {
        return uint(keccak256(recipientID, issuingAuthority, now));
    }

    function issueCertificate(string description, string issuingAuthority, string recipientID,
        string typeOfCertificate, string details) public {
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
