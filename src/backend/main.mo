import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Order "mo:core/Order";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat8 "mo:core/Nat8";
import Nat64 "mo:core/Nat64";
import Nat "mo:core/Nat";
import Char "mo:core/Char";
import Int "mo:core/Int";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";

actor {
  include MixinStorage();

  // Authentication system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Custom Types
  type Email = Text;
  type Price = Text;
  type Timestamp = Time.Time;

  // External file reference
  type Image = Storage.ExternalBlob;

  // Persistent Data Model
  type ContactSubmission = {
    name : Text;
    email : Email;
    message : Text;
    timestamp : Timestamp;
  };

  module ContactSubmission {
    public func compareByTimestamp(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(b.timestamp, a.timestamp);
    };
  };

  type PortfolioCategory = {
    #weddings;
    #portraits;
    #landscapes;
    #commercial;
    #events;
    #other : Text;
  };

  func textToPortfolioCategory(categoryText : Text) : PortfolioCategory {
    let lowercaseText = categoryText.toLower();
    if (lowercaseText.startsWith(#text "weddings")) {
      return #weddings;
    };
    if (lowercaseText.startsWith(#text "portraits")) {
      return #portraits;
    };
    if (lowercaseText.startsWith(#text "landscapes")) {
      return #landscapes;
    };
    if (lowercaseText.startsWith(#text "commercial")) {
      return #commercial;
    };
    if (lowercaseText.startsWith(#text "events")) {
      return #events;
    };
    #other(categoryText);
  };

  type PortfolioItem = {
    title : Text;
    category : PortfolioCategory;
    description : Text;
    image : Image;
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  type ServicePackage = {
    name : Text;
    description : Text;
    price : Price;
    features : [Text];
    createdAt : Timestamp;
    updatedAt : Timestamp;
  };

  type AboutSection = {
    bio : Text;
    tagline : Text;
    portraitImage : Image;
    lastUpdated : Timestamp;
  };

  // Persistent Storage
  let contactSubmissions = List.empty<ContactSubmission>();

  let portfolioItems = Map.empty<Nat, PortfolioItem>();
  var nextPortfolioId = 1;

  let servicePackages = Map.empty<Nat, ServicePackage>();
  var nextPackageId = 1;

  var aboutSection : ?AboutSection = null;

  // Contact Form
  public shared ({ caller }) func submitContactForm(name : Text, email : Email, message : Text) : async () {
    let submission : ContactSubmission = {
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(submission);
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    contactSubmissions.toArray().sort(ContactSubmission.compareByTimestamp);
  };

  public query ({ caller }) func getContactSubmissionsCount() : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    contactSubmissions.size();
  };

  // Portfolio Management
  public shared ({ caller }) func createPortfolioItem(title : Text, category : Text, description : Text, image : Image) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let id = nextPortfolioId;
    nextPortfolioId += 1;

    let portfolio : PortfolioItem = {
      title;
      category = textToPortfolioCategory(category);
      description;
      image;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    portfolioItems.add(id, portfolio);
    id;
  };

  public shared ({ caller }) func updatePortfolioItem(id : Nat, updated : PortfolioItem) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };

    switch (portfolioItems.get(id)) {
      case (null) { Runtime.trap("Portfolio item not found") };
      case (?existing) {
        let today = Time.now();
        let updatedItem = {
          updated with
          createdAt = existing.createdAt;
          updatedAt = today;
        };
        portfolioItems.add(id, updatedItem);
      };
    };
  };

  public shared ({ caller }) func deletePortfolioItem(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    if (not portfolioItems.containsKey(id)) {
      Runtime.trap("Portfolio item not found");
    };
    portfolioItems.remove(id);
  };

  public query ({ caller }) func getPortfolioItems() : async [PortfolioItem] {
    portfolioItems.values().toArray();
  };

  public query ({ caller }) func getPortfolioItemsByCategory(category : PortfolioCategory) : async [PortfolioItem] {
    portfolioItems.values().filter(func(item) { item.category == category }).toArray();
  };

  public query ({ caller }) func getPortfolioItem(id : Nat) : async ?PortfolioItem {
    portfolioItems.get(id);
  };

  public query ({ caller }) func getPortfolioCount() : async Nat {
    portfolioItems.size();
  };

  // Service Packages
  public shared ({ caller }) func createServicePackage(name : Text, description : Text, price : Price, features : [Text]) : async Nat {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let id = nextPackageId;
    nextPackageId += 1;

    let servicePackage : ServicePackage = {
      name;
      description;
      price;
      features;
      createdAt = Time.now();
      updatedAt = Time.now();
    };

    servicePackages.add(id, servicePackage);
    id;
  };

  public shared ({ caller }) func updateServicePackage(id : Nat, updated : ServicePackage) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };

    switch (servicePackages.get(id)) {
      case (null) { Runtime.trap("Service package not found") };
      case (?existing) {
        let updatedPackage = {
          updated with
          createdAt = existing.createdAt;
          updatedAt = Time.now();
        };
        servicePackages.add(id, updatedPackage);
      };
    };
  };

  public shared ({ caller }) func deleteServicePackage(id : Nat) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    if (not servicePackages.containsKey(id)) {
      Runtime.trap("Service package not found");
    };
    servicePackages.remove(id);
  };

  public query ({ caller }) func getServicePackages() : async [ServicePackage] {
    servicePackages.values().toArray();
  };

  public query ({ caller }) func getServicePackage(id : Nat) : async ?ServicePackage {
    servicePackages.get(id);
  };

  public query ({ caller }) func getServicePackagesCount() : async Nat {
    servicePackages.size();
  };

  // About Section
  public shared ({ caller }) func updateAboutSection(bio : Text, tagline : Text, portraitImage : Image) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Admins only");
    };
    let newAbout : AboutSection = {
      bio;
      tagline;
      portraitImage;
      lastUpdated = Time.now();
    };
    aboutSection := ?newAbout;
  };

  public query ({ caller }) func getAboutSection() : async ?AboutSection {
    aboutSection;
  };
};
