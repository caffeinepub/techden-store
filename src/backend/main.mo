import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Text "mo:core/Text";

actor {
  type GpuType = {
    id : Nat;
    name : Text;
    brand : Text;
    series : Text;
    vram : Text;
    price : Nat;
    condition : Text;
    performanceRating : Float;
    description : Text;
    releaseYear : Nat;
    tdp : Nat;
    isFeatured : Bool;
    imageUrl : Text;
  };

  module GpuType {
    public func compare(gpu1 : GpuType, gpu2 : GpuType) : Order.Order {
      Nat.compare(gpu1.id, gpu2.id);
    };
  };

  let gpus = Map.fromIter<Nat, GpuType>(
    [
      (
        1,
        {
          id = 1;
          name = "RTX 4090";
          brand = "NVIDIA";
          series = "RTX40";
          vram = "24GB";
          price = 95000;
          condition = "Used";
          performanceRating = 4.9;
          description = "High-end gaming GPU";
          releaseYear = 2023;
          tdp = 450;
          isFeatured = true;
          imageUrl = "https://example.com/rtx4090.jpg";
        },
      ),
      (
        2,
        {
          id = 2;
          name = "RTX 3080";
          brand = "NVIDIA";
          series = "RTX30";
          vram = "10GB";
          price = 35000;
          condition = "Used";
          performanceRating = 4.5;
          description = "Popular gaming GPU";
          releaseYear = 2020;
          tdp = 320;
          isFeatured = true;
          imageUrl = "https://example.com/rtx3080.jpg";
        },
      ),
      (
        3,
        {
          id = 3;
          name = "RTX 4070";
          brand = "NVIDIA";
          series = "RTX40";
          vram = "12GB";
          price = 42000;
          condition = "Used";
          performanceRating = 4.6;
          description = "New generation GPU";
          releaseYear = 2023;
          tdp = 200;
          isFeatured = true;
          imageUrl = "https://example.com/rtx4070.jpg";
        },
      ),
      (
        4,
        {
          id = 4;
          name = "RX 7900 XTX";
          brand = "AMD";
          series = "RX7000";
          vram = "24GB";
          price = 80000;
          condition = "Used";
          performanceRating = 4.8;
          description = "High-end AMD GPU";
          releaseYear = 2022;
          tdp = 355;
          isFeatured = true;
          imageUrl = "https://example.com/rx7900xtx.jpg";
        },
      ),
      (
        5,
        {
          id = 5;
          name = "RTX 3060";
          brand = "NVIDIA";
          series = "RTX30";
          vram = "12GB";
          price = 17000;
          condition = "Used";
          performanceRating = 3.8;
          description = "Mid-range gaming GPU";
          releaseYear = 2021;
          tdp = 170;
          isFeatured = false;
          imageUrl = "https://example.com/rtx3060.jpg";
        },
      ),
      (
        6,
        {
          id = 6;
          name = "GTX 1660 Ti";
          brand = "NVIDIA";
          series = "GTX16";
          vram = "6GB";
          price = 11000;
          condition = "Used";
          performanceRating = 3.2;
          description = "Budget gaming GPU";
          releaseYear = 2019;
          tdp = 120;
          isFeatured = false;
          imageUrl = "https://example.com/gtx1660ti.jpg";
        },
      ),
      (
        7,
        {
          id = 7;
          name = "RX 6700 XT";
          brand = "AMD";
          series = "RX6000";
          vram = "12GB";
          price = 22000;
          condition = "Used";
          performanceRating = 4.0;
          description = "AMD mid-range GPU";
          releaseYear = 2021;
          tdp = 230;
          isFeatured = false;
          imageUrl = "https://example.com/rx6700xt.jpg";
        },
      ),
      (
        8,
        {
          id = 8;
          name = "RX 580";
          brand = "AMD";
          series = "RX500";
          vram = "8GB";
          price = 6000;
          condition = "Used";
          performanceRating = 2.8;
          description = "Older but reliable GPU";
          releaseYear = 2017;
          tdp = 185;
          isFeatured = false;
          imageUrl = "https://example.com/rx580.jpg";
        },
      ),
      (
        9,
        {
          id = 9;
          name = "GTX 1080 Ti";
          brand = "NVIDIA";
          series = "GTX10";
          vram = "11GB";
          price = 13000;
          condition = "Used";
          performanceRating = 3.5;
          description = "Classic high-end GPU";
          releaseYear = 2017;
          tdp = 250;
          isFeatured = false;
          imageUrl = "https://example.com/gtx1080ti.jpg";
        },
      ),
      (
        10,
        {
          id = 10;
          name = "RX 6800 XT";
          brand = "AMD";
          series = "RX6000";
          vram = "16GB";
          price = 35000;
          condition = "Refurbished";
          performanceRating = 4.6;
          description = "Powerful AMD GPU";
          releaseYear = 2020;
          tdp = 300;
          isFeatured = true;
          imageUrl = "https://example.com/rx6800xt.jpg";
        },
      ),
    ].values(),
  );

  var nextGpuId = 11;

  public shared ({ caller }) func addGpu(
    name : Text,
    brand : Text,
    series : Text,
    vram : Text,
    price : Nat,
    condition : Text,
    performanceRating : Float,
    description : Text,
    releaseYear : Nat,
    tdp : Nat,
    imageUrl : Text,
  ) : async Nat {
    let id = nextGpuId;
    nextGpuId += 1;

    let gpu : GpuType = {
      id;
      name;
      brand;
      series;
      vram;
      price;
      condition;
      performanceRating;
      description;
      releaseYear;
      tdp;
      isFeatured = false;
      imageUrl;
    };

    gpus.add(id, gpu);
    id;
  };

  public shared ({ caller }) func updateGpu(
    id : Nat,
    name : Text,
    brand : Text,
    series : Text,
    vram : Text,
    price : Nat,
    condition : Text,
    performanceRating : Float,
    description : Text,
    releaseYear : Nat,
    tdp : Nat,
    imageUrl : Text,
  ) : async Bool {
    switch (gpus.get(id)) {
      case (null) {
        Runtime.trap("GPU does not exist");
      };
      case (?existingGpu) {
        let updatedGpu : GpuType = {
          id;
          name;
          brand;
          series;
          vram;
          price;
          condition;
          performanceRating;
          description;
          releaseYear;
          tdp;
          isFeatured = existingGpu.isFeatured;
          imageUrl;
        };
        gpus.add(id, updatedGpu);
        true;
      };
    };
  };

  public shared ({ caller }) func removeGpu(id : Nat) : async Bool {
    if (not gpus.containsKey(id)) {
      Runtime.trap("GPU does not exist");
    };
    gpus.remove(id);
    true;
  };

  public query ({ caller }) func getGpus() : async [GpuType] {
    gpus.values().toArray().sort();
  };

  public query ({ caller }) func getGpu(id : Nat) : async ?GpuType {
    gpus.get(id);
  };

  public query ({ caller }) func getFeaturedGpus() : async [GpuType] {
    gpus.toArray().filter(func((_, gpu)) { gpu.isFeatured }).map(func((_, gpu)) { gpu });
  };

  public shared ({ caller }) func toggleFeatured(id : Nat) : async Bool {
    switch (gpus.get(id)) {
      case (null) {
        Runtime.trap("GPU does not exist");
      };
      case (?gpu) {
        let updatedGpu = { gpu with isFeatured = not gpu.isFeatured };
        gpus.add(id, updatedGpu);
        true;
      };
    };
  };

  public query ({ caller }) func verifyAdminPassword(password : Text) : async Bool {
    password == "techden2026";
  };
};
