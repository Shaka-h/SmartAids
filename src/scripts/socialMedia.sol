//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
 //prevents re-entrancy attacks
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract AlphaConnect is ReentrancyGuard, AccessControl {
    using SafeMath for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _PostIds; //total number of Posts ever created
    Counters.Counter private _Postsliked; //total number of likes of a post
    Counters.Counter private _Postsunliked; //total number of dislikes of a post
    Counters.Counter private _PostsComments; //total number of comments of a post
    
    mapping(uint256 => Counters.Counter) private numberOfCommentsPerPost;

    struct Post {
        uint PostId;
        uint postTokenId;
        address profileContract;
        address creator; 
        uint256 like;
        uint256 dislike;
        uint256 comment;
        uint256 time;
    }
    
    struct Comment {
        address profileContract;
        address commentor;
        uint256 PostID;
        uint256 commentID;
        string commentUrl;
        uint256 time;
    }

    struct Likes {
        uint postID;
        address liker;
        uint256 timestamp;
        bool like;
    }

    //a way to access values of the post and comment struct above by passing an integer of the PostID
    mapping(uint256 => Post) public idPost;
    mapping(uint256 => Comment) public idComment;
    mapping(uint256 => Comment) public PostComment;
    mapping(uint256 => Comment[]) public commentsMadeToPost;
    mapping(uint256 => Likes[]) likeOfPost; 
    mapping(address => Likes[]) likedBy; 

    //log message (when Post is sold)
    event PostCreated (
        uint indexed PostId,
        address indexed profileContract,
        uint256 indexed postTokenId,
        address creator,
        uint256 like,
        uint256 dislike,
        uint256 comment,
        uint256 time
    );

    event commentMade (
        address profileContract,
        address commentor,
        uint256 PostID,
        uint256 commentID,
        string commentUrl,
        uint256 time
    );
    
    event PostLiked(
        uint indexed postID,
        address indexed liker,
        uint256 timestamp,
        bool like
    );

    
    constructor() {

    }

    /// @notice function to create market Post
    function createPost(
        address profileContract,
        uint256 tokenId
        ) public nonReentrant{      

        _PostIds.increment(); //add 1 to the total number of Posts ever created
        uint256 PostId = _PostIds.current();

        idPost[PostId] = Post(
             PostId,
             tokenId,
             profileContract,
             msg.sender, 
             0,
             0,
             0,
             block.timestamp
        );
 
        //transfer ownership of the nft to the contract itself
        IERC721(profileContract).transferFrom(msg.sender, address(this), tokenId);

        //log this transaction
        emit PostCreated (
            PostId,
            profileContract,
            tokenId,
            msg.sender, 
            0,
            0,
            0,
            block.timestamp
        );

    }   
        

    function commentPost(uint256 postID, string memory commentUrl) public nonReentrant {
        // Extract necessary details
        address profileContract = idPost[postID].profileContract;
        address commentor = msg.sender;

        // Increment comment counter for this post
        numberOfCommentsPerPost[postID].increment();

        // Store the comment
        uint256 commentID = numberOfCommentsPerPost[postID].current();
        commentsMadeToPost[postID].push(Comment({
            profileContract: profileContract,
            commentor: commentor,
            PostID: postID,
            commentID: commentID,
            commentUrl: commentUrl,
            time: block.timestamp
        }));

        emit commentMade (
            profileContract,
            commentor,
            postID,
            commentID,
            commentUrl,
            block.timestamp
        );
    }


    function getAllCommentsMadeToPost(uint256 postID) external view returns (Comment[] memory) {
        Comment[] storage comments = commentsMadeToPost[postID];
        Comment[] memory commentsInfo = new Comment[](comments.length);

        for (uint256 i = 0; i < comments.length; i++) {
            commentsInfo[i] = Comment({
                profileContract: comments[i].profileContract,
                commentor: comments[i].commentor,
                PostID: comments[i].PostID,
                commentID: comments[i].commentID,
                commentUrl: comments[i].commentUrl,
                time: comments[i].time
            });
        }

        return commentsInfo;
    }


    /// @notice fetch list of NFTS owned/bought by this user
    function fetchMyPostsCreated() public view returns (Post[] memory){
        //get total number of Posts ever created
        uint totalPostCount = _PostIds.current();

        uint PostCount = 0;
        uint currentIndex = 0;


        for(uint i = 0; i < totalPostCount; i++){
            //get only the Posts that this user has bought/is the owner
            if(idPost[i+1].creator == msg.sender){
                PostCount += 1; //total length
            }
        }

        Post[] memory Posts = new Post[](PostCount);
        for(uint i = 0; i < totalPostCount; i++){
            if(idPost[i+1].creator == msg.sender){
                uint currentId = idPost[i+1].PostId;
                Post storage currentPost = idPost[currentId];
                Posts[currentIndex] = currentPost;
                currentIndex += 1;
            }
        }
        return Posts;

    }


    /// @notice Fetch list of NFTs owned/bought by this user
    function fetchAllPostsCreated() public view returns (Post[] memory) {
        // Get total number of Posts ever created
        uint totalPostCount = _PostIds.current();
        
        // Initialize array to store all posts
        Post[] memory allPosts = new Post[](totalPostCount);

        // Iterate through all posts and copy them to the array
        for (uint i = 1; i <= totalPostCount; i++) {
            uint postId = idPost[i].PostId;
            Post storage currentPost = idPost[postId];
            allPosts[i - 1] = currentPost;
        }

        return allPosts;
    }


    // function likePost(uint256 postID) public nonReentrant {
    //     // Ensure the post exists
    //     require(postID > 0 && postID <= _PostIds.current(), "Invalid post ID");

    //     // Ensure the user has not already liked the post
    //     require(!idPost[postID].likedBy[msg.sender], "You have already liked this post");

    //     // Mark the post as liked by the user
    //     idPost[postID].likedBy[msg.sender] = true;

    //     // Increment the like count for the post
    //     idPost[postID].like++;

    //     // Emit an event to log the like
    //     emit PostLiked(postID, msg.sender, block.timestamp, true);
    // }

}