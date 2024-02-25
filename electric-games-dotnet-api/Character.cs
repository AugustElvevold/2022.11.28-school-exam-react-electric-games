namespace ElectricGamesApi;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Character : ICharacter
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string id { get; set; } = "";
    public string name { get; set; } = "Not set";
    public string game { get; set; } = "Not set";
    public string image { get; set; } = "Not set";
}
