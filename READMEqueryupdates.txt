The depth level for API AWS queries is not enough for some functions. Every time the API is updated these
will need to be updated


getStory {
	tags {
		items {
			tag {
				id
				tagName
				count
			}
		}
	}
	eroticTags {
		items {
			eroticTag {
				id
				tagName
				count
			}
		}
	}
}

inProgressStoriesByUser {
	items {
		story {
			genre {
				id
				genre
				icon
				color
			}
		}
	}
}

pinnedStoriesByUser {
	items {
		story {
			genre {
				id
				genre
				icon
				color
			}
		}
	}
}

finishedStoriesByUser {
	items {
		story {
			genre {
				id
				genre
				icon
				color
			}
		}
	}
}

ratingsByUser {
	items {
		story {
			genre {
				id
				genre
				icon
				color
			}
		}
	}
}

eroticStoryTagsByEroticTagId {
	items {
		story {
			genre {
				id
				genre
				icon
				color
			}
		}
	}
}

storyTagsByTagId {
	items {
		story {
			genre {
				id
				genre
				icon
				color
			}
		}
	}
}

getUser {
	published {
		items {
			story {
				genre {
					id
					genre
					icon
					color
				}
			}
		}
	}
}

commentsByStory {
	rating {
		reactionType {
            id
            reaction
            icon
        }
	}
}

