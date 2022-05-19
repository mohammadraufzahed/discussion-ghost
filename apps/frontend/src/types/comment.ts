type Comment = {
    name: string
    since: {
        value: number
        type: "year" | "month" | "day" | "hour" | "minute" | "second"
    }
    content: string
    upvotes: number
    subComments ?: Comment[]
}

export default Comment;