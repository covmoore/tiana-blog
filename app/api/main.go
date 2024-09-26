package main

import (
    "net/http"

    "github.com/gin-gonic/gin"
)

type post struct {
	BID    	int  `json:"bid"`
	Title  	string  `json:"title"`
	Key 		string  `json:"key"`
	Author  string `json:"author"`
	Date 		string `json:"date"`
	Body 		string `json:"body"`
}

var posts = []post{
	{
    BID: 1,
    Title: "Into to the blog",
    Key: "intro-to-the-blog",
    Author: "Tiana Montez",
    Date: "8/23/2024",
    Body: `<text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce gravida elit a lacus auctor, sit amet tristique neque congue. Integer molestie eros nec leo congue tincidunt. Aliquam bibendum consectetur condimentum. Curabitur vitae tortor risus. Nam ante erat, tempor vel imperdiet sed, varius nec elit. Sed commodo mauris ut neque viverra, non pulvinar enim vestibulum. Etiam id quam rutrum, bibendum ipsum ut, feugiat augue. Nam luctus ante nisi, sit amet tincidunt erat interdum sed. Donec in quam pharetra, mollis lacus sed, luctus quam. Suspendisse mollis est vel elit sodales fringilla. Donec commodo lobortis ipsum, ut blandit turpis. Cras sollicitudin justo sed massa molestie, nec interdum sapien dapibus. Cras sollicitudin neque lectus, vitae ultricies nibh sagittis quis. Phasellus commodo turpis sit amet finibus porttitor. Etiam convallis tortor non enim imperdiet, sagittis posuere dolor ullamcorper. Donec at convallis felis.
					</text>,
					<text>
						Curabitur posuere congue lectus eu vulputate. Maecenas vitae nibh quis nunc tincidunt pharetra. Phasellus eu augue eu purus pulvinar dictum in et est. Nunc in suscipit erat. Integer et urna vel enim hendrerit sagittis. Integer a nisi enim. Nullam efficitur nulla ex, ut porttitor leo aliquet non. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
					</text>,
					<div className="flex justify-center">
						<img className="max-h-96" key="books" src="/_next/static/media/books.f934bb24.jpg" />
					</div>,
					<text>
						Nunc nec leo ac velit hendrerit varius. Nullam viverra risus eu dui iaculis interdum. Nam placerat mi id nulla tincidunt, vel efficitur nisi consequat. Ut ac libero non massa finibus mattis. Donec fringilla feugiat erat non condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vestibulum elementum odio. Pellentesque elementum dignissim ultrices. Morbi auctor in nulla vitae eleifend. Duis ut lacinia lacus, vitae fringilla justo. Suspendisse ex dolor, feugiat eu dui tincidunt, condimentum consectetur urna. Fusce mauris risus, suscipit sed quam at, dapibus convallis diam.
					</text>`,
  },
}

func getPosts(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, posts)
}

func main() {
	router := gin.Default()
	router.GET("/posts", getPosts)

	router.Run("localhost:8080")
}